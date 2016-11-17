import Tracker from 'tracker-component';
import {Meteor} from 'meteor/meteor';
import {I18n, Countries} from '/models';
import React from 'react';
import {ManagedList, ManagedForm} from '/client/components';


export class I18nListPage extends Tracker.Component {
  constructor(props) {
    super(props);

    this.state = {data: []};

    this.autorun(() => {
      this.subscribe('i18n.list');
    });

    this.autorun(() => {
      const data = I18n.find().fetch();
      this.setState({data});
    });
  }

  render() {
    const {STATE} = I18n;

    const columns = {
      section: {
        label: 'Section',
      },
      name: {
        label: 'Name',
        field: '_id',
      },
      state: {
        label: 'State',
      },

      href({_id}) {
        return `/locales/i18n/edit/${_id}`;
      },
    };

    return (
      <div title={I18n.tag('i18n.list.header')}>
        <ManagedList columns={columns} data={this.state.data}/>
      </div>
    );
  }
}

export class I18nEditPage extends Tracker.Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, errors: {}};

    this.autorun(() => {
      this.subscribe('i18nElement', this.props.params.id);
    });

    this.autorun(() => {
      const data = I18n.findOne(this.props.params.id) || {};
      this.setState({data});
    });
  }

  onDone(e) {
    e.preventDefault();

    this.setState({errors: {}});
    Meteor.call('i18nSaveEdit', data, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    const fields = {
      id: {
        name: '_id',
        label: I18n.tag('admin.i18n.edit.id'),
        type: 'static',
      },
    };

    const actions = {
      save: {
        label: I18n.tag('common.actions.saveEdit'),
        handler: (e) => this.onDone(e),
      },
    };

    Countries.find().forEach(({_id}) => {
      fields[_id] = {name: _id, label: _id};
    });

    return (
      <div title={I18n.tag('admin.i18n.editHeader')} actions={actions}>
        <ManagedForm ref="data" action=""/>
      </div>
    );
  }
}
