
export default function initUtils() {
  return {
    getFormValues(form = {}, ...props) {
      const {elements = []} = form;

      const getValueFromElement = (el) => {
        if (el.type === 'number') {
          return el.valuesAsNumber;
        }

        if (el.type === 'date') {
          return el.valueAsDate;
        }

        if (el.tagName === 'textarea') {
          return el.innerText;
        }

        if (el.tagName === '')
      }

      return _.chain(elements)
        .filter(({name, dataset = {}}) => {
          return (!props.length || props.includes(name, dataset.name));
        })
        .reduce((memo, el) => {
          const name = el.name || (el.dataset || {}).name;
          if (!name) {
            return memo;
          }

          if (el.type === 'number') {
            return _.extend(memo, )
          }
        }, {})
        .value()
    }
  };
}
