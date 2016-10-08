import React from 'react';
import {Tracker} from 'meteor/tracker';
import {Grid, Row, Col, Label, ListGroup, ListGroupItem} from 'react-bootstrap';

const paramsSizes = {
  thumb: {xs: 0, md: 3},
  check: {xs: 2, md: 1},
  actions: {xs: 2, md: 1},
  state: {xs: 3, md: 2},
};

const getStructure = (columns) => {
  const params = {};
  const fields = {};

  _.each(columns, (value, key) => {
    if (['thumb', 'icon', 'check', 'actions', 'state', 'href', 'click'].includes(key)) {
      params[key] = true;
    } else {
      fields[key] = true;
    }
  });

  const fieldSize = Math.ceil(12 / (_.size(fields) || 1));
  return {params, fields, fieldSize};
};

export const List = ({columns, data}) => {
  const struct = getStructure(columns);

  const fieldsSizeProps = _.reduce(paramsSizes, (memo, values, key) => {
    return {
      xs: struct.params[key] ? memo.xs - values.xs : memo.xs,
      md: struct.params[key] ? memo.md - values.md : memo.md,
    };
  }, {xs: 12, md: 12});

  const renderState = (header, item = {}) => {
    const field = columns.state;

    const wrapAndRender = (child) => {
      return (<Col {...paramsSizes.state}>{child}</Col>);
    };

    if (header) {
      return wrapAndRender(field.label);
    }

    if (field.renderer) {
      return wrapAndRender(field.renderer(item));
    }
    const value = field.field ? item[field.field] : item.state;
    const state = _.reduce(field.states, (memo, values, key) => {
      return (values && values.length && values.includes(value)) ? key : memo;
    }, 'default');

    return wrapAndRender(<Label bsStyle={state || 'default'}>{value}</Label>);
  };

  const renderField = (header, name, item = {}) => {
    const field = columns[name];

    const wrapAndRender = (child) => {
      const props = {
        md: struct.fieldSize,
      };

      if (!field.primary) {
        props.xsHidden = true;
      }

      return (<Col key={name} {...props}>{child}</Col>);
    };

    if (header) {
      return wrapAndRender(field.label);
    }

    if (field.renderer) {
      return wrapAndRender(field.renderer(item));
    }
    const value = field.field ? item[field.field] : item[name];
    return wrapAndRender(value);
  };

  const renderRow = (header, item = {}) => {
    const checkCol = (null);
    const stateCol = struct.params.state ? renderState(header, item) : (null);
    const thumbCol = (null);
    const actionsCol = (null);

    const fieldsMap = _.map(struct.fields, (value, name) => {
      return renderField(header, name, item);
    });

    const fieldsCol = (<Col {...fieldsSizeProps}><Grid><Row>{fieldsMap}</Row></Grid></Col>);

    return (<Row>{checkCol}{stateCol}{thumbCol}{fieldsCol}{actionsCol}</Row>);
  };

  const renderItems = () => {
    return _.map(data, (item, idx) => {
      const itemProps = {};
      if (struct.params.href) {
        itemProps.href = columns.href(item);
      }

      if (struct.params.click) {
        itemProps.onClick = (e) => {
          e.preventDefault();
          columns.click(e, item);
        };
      }

      const key = item._id || idx || 1;
      return (
        <ListGroupItem key={key} {...itemProps}>
          <Grid>{renderRow(false, item)}</Grid>
        </ListGroupItem>
      );
    });
  };

  return (
    <ListGroup>
      <ListGroupItem disabled>
        <Grid>{renderRow(true)}</Grid>
      </ListGroupItem>
      {renderItems()}
    </ListGroup>
  );
};


export class ListPage extends Tracker.Component {
  constructor(props) {
    super(props);

    this.dataKey = '_id';

    this.fields = {};
    this.filters = {};
    this.orders = {};

    this.state = {selected: [], hasMore: false, loading: true, data: [], selector: {}, sort: {}};
  }

  setLoadingState(loading) {
    this.setState({loading})
  }

  setData(data) {
    const dataKeys = _.pick(data, this.dataKey);
    const selected = _.intersection(this.state.selected, dataKeys);

    this.setState({data, selected});
  }

  setCollection(collection, transform) {
    this.autorun(() => {
      const {selector, sort} = this.state;

      const data = collection.find(selector, {sort, transform}).fetch();
      this.setData(data);
    });
  }
}
