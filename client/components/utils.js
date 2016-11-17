export const valuefy = (prop, ...others) => {
  return _.isFunction(prop) ? prop(...others) : prop;
};

export const valuefyMap = (props = {}, keys = [], ...others) => {
  return _.reduce(props, (memo, prop, key) => {
    const res = memo;
    if (keys && keys.length && !keys.includes(key)) {
      return memo;
    }

    res[key] = valuefy(prop, ...others);
    return res;
  }, {});
};

export const valuefyMaps = (map, keys, ...others) => {
  return _.reduce(map, (memo, props, key) => {
    const res = memo;
    res[key] = valuefyMap(props, keys, ...others);
    return res;
  }, {});
};


export const valuefyAction = (prop, defaults = {}, ...others) => {
  const parseProp = () => {
    if (_.isObject(prop)) {
      return prop;
    }

    if (_.isString(prop)) {
      return {label: prop};
    }

    if (_.isFunction(prop)) {
      return {onClick: prop};
    }

    return {};
  };

  const props = _.extend(defaults, parseProp());
  if (props.label) {
    props.children = [(props.label)];
  }
  return _.omit(props, 'label');
};
