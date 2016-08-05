
export default function ({AppState, Meteor, Models, Tracker}) {
  const {I18n, Countries} = Models;

  const changeCurrentLang = (lang = 'en') => {
    AppState.set({lang});
  };

  const getTranslate = (name, _lang) => {
    const lang = _lang || AppState.get('lang') || 'en';

    return (I18n.findOne({name}) || {})[lang] || name;
  };

  I18n.changeLang = changeCurrentLang;
  I18n.get = getTranslate;


  Tracker.autorun(() => {
    const lang = AppState.get('lang');
    Meteor.subscribe('i18n', lang);
  });

  class I18nTag extends Tracker.Component {
    constructor(props = {}) {
      super();
      this.state = {opened: false, text: props.name};

      this.autorun(() => {
        const {name} = (this.props || props);
        const lang = AppState.get('lang') || 'en';
        const i18nData = I18n.findOne({name}) || {};

        this.setState({
          lang,
          text: i18nData[lang] || i18nData.en || name,
          data: i18nData,
          noLangs: Boolean(i18nData[lang]),
        });
      });
    }

    onLangValueChanged(lang, text) {
      Meteor.call('saveI18nRecord', this.props.name, lang, text);
    }

    renderText() {
      const style = {
        pointerEvents: Meteor.isDevelopment ? 'all' : 'none',
        cursor: Meteor.isDevelopment ? 'pointer' : 'auto',
      };

      const onOpenModal = () => {
        if (Meteor.isDevelopment) {
          this.setState({opened: true});
          document.body.classList.add('modal-open');
        }
      };

      return (<span style={style} onClick={onOpenModal}>{this.state.text}</span>);
    }

    renderModal() {
      if (!Meteor.isDevelopment) {
        return (null);
      }

      if (!this.state.opened) {
        return (null);
      }

      const langs = Countries
        .find({}, {sort: {lang: 1}})
        .map(({lang}) => {
          const onChange = (e) => {
            const text = (e.target.value || '').trim();
            if (text !== '') {
              this.onLangValueChanged(lang, text);
            }
          };

          const value = this.state.data[lang] || '';
          const id = `${name.replace('.', '_')}_${lang}}`;

          return (
            <div className="form-group" key={lang}>
              <label htmlFor={id} className="col-sm-2 control-label">{lang}</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id={id}
                  placeholder="No translation"
                  value={value}
                  onBlur={onChange}
                />
              </div>
            </div>
          );
        });

      const onCloseModal = () => {
        this.setState({opened: false});
        document.body.classList.remove('modal-open');
      };

      return (
        <div className="modal fade in" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" aria-label="Close" onClick={onCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title">{this.props.name}</h4>
              </div>
              <div className="modal-body">
                <div className="form-horizontal">
                  {langs}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    render() {
      return (<span>{this.renderText()} {this.renderModal()}</span>);
    }
  }

  I18n.tag = I18nTag;

  return I18n;
}

