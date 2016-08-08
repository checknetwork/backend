
export default function initUtils() {
  return {
    getFormValues(form = {}, ...props) {
      const {elements = []} = form;

      return _.chain(elements)
        .filter(({name, dataset = {}}) => {
          return (!props.length || props.includes(name, dataset.name));
        })
        .reduce((memo, el) => {
          const name = el.name || (el.dataset || {}).name;
          if (!name) {
            return memo;
          }

          switch(el.type) {
            case 'number'
          }
        }, {})
        .value()
    }
  };
}
