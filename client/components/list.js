import React from 'react';
import classNames from 'classnames';

const getStructure = (columns) => {
  const fields = _.omit(columns, 'thumb', 'icon', 'check', 'actions', 'more');
  const params = _.chain(columns)
    .pick('thumb', 'icon', 'check', 'actions', 'more')
    .map(() => true)
    .value();
  return {params, fields};
};

export const List = ({columns, data}) => {
  const struct = getStructure(columns);
  const fields = _.omit(columns, 'thumb', 'icon', 'check', 'actions', 'more');

  const hasThumb = _.has(columns, 'thumb');
  const hasIcon = _.has(columns, 'icon');
  const hasCheck = _.has(columns, 'check');
  const hasActions = _.has(columns, 'actions');

  const renderHeader = () => {
    const renderLeftMedia = () => {
      if (hasThumb) {return (<div className="list--thumb"/>);}
      if (hasIcon) {return (<div className="list--icon"/>);}

      const onChange = (e) => {
        const {target} = e;
        if (columns.check) {
          const ids = _.pick(data, '_id') || [];

          if (ids.length === 0) {
            target.checked = false;
          } else {
            columns.check(ids, target.checked);
          }
        }
      };

      if (hasCheck) {
        return (
          <label className="list--thumb checkbox-inline">
            <input type="checkbox" onChange={onChange}/>
          </label>
        );
      }
      return (null);
    };

    const renderBody = () => {
      let sizes = 12;
      const defaultSize = Math.ceil(12 / (_.size(fields) || 1));

      return _.map(fields, (props, key) => {
        const size = Math.min(props.size || defaultSize, sizes);
        sizes -= size;

        const columnClass = `col-md-${size}`;

        return (
          <div key={key} className={columnClass}>
            <h6>{props.label || key}</h6>
          </div>
        );
      });
    };

    const renderRightMedia = () => {
      if (hasActions) {return (<div className="list--icon"/>);}
      return (null);
    };

    return (
      <div className="media">
        <div className="media-left">{renderLeftMedia()}</div>
        <div className="media-body">{renderBody()}</div>
        <div className="media-right">{renderRightMedia()}</div>
      </div>
    );
  };

  return (
    <div className="list--container">
      <div className="list--header">{renderHeader()}</div>
    </div>
  );
};
