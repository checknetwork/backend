import React from 'react';
import {valuefy, valuefyMaps, valuefyMap} from './utils';
import {Button, Checkbox, Icon, Table, Header} from 'semantic-ui-react';

export const ManagedList = React.createClass({
  getInitialState() {
    return {selected: [], filter: {}, sort: {}};
  },

  renderHeader() {
    const {fields} = this.props;

    const map = _.map(fields, (field, key) => {
      return (<Table.HeaderCell key={key}>{field.label || key}</Table.HeaderCell>);
    });

    return (<Table.Header fullWidth><Table.Row>{map}</Table.Row></Table.Header>);
  },

  renderRows() {
    const {idKey = '_id', data = [], fields, href} = this.props;

    if (!data || !data.length) {
      return (null);
    }

    const mergedFieldProps = [
      'collapsing',
      'content',
      'disabled',
      'error',
      'icon',
      'negative',
      'positive',
      'singleLine',
      'textAlign',
      'verticalAlign',
      'warning',
      'width',
    ];

    const mergedCellProps = [
      'disabled',
      'error',
      'icon',
      'negative',
      'positive',
      'warning',
    ];

    const fieldsProps = valuefyMaps(fields, mergedFieldProps);

    const map = _.map(data, (item, idx) => {
      const list = _.map(fields, (field, key) => {
        const contentRaw = valuefy(field.value, item) || item[key] || item[field.name];
        const cellProps = valuefyMap(field, mergedCellProps, item);
        const props = _.extend({}, fieldsProps[key], cellProps);

        const content = field.href ? (<a href={valuefy(field.href, item)}>{contentRaw}</a>) : (contentRaw);

        return (<Table.Cell key={key} {...props}>{content}</Table.Cell>);
      });

      return (<Table.Row key={item[idKey] || idx}>{list}</Table.Row>);
    });

    return (<Table.Body>{map}</Table.Body>);
  },

  renderFooter() {
    const {data, fields, actions} = this.props;

    if (!data || !data.length) {
      const fieldsCount = _.size(fields);
      return (
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan={fieldsCount}>
              <Header as="h3" icon textAlign="center">
                <Icon name="folder outline"/>
                No data to display
                <Header.Subheader className="app-auto-wrap">
                  It seems like there is no any entire data to show or no elements that match filters provided.
                </Header.Subheader>
              </Header>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      );
    }

    return (null);
  },

  render() {
    return (
      <Table celled selectable>
        {this.renderHeader()}
        {this.renderRows()}
        {this.renderFooter()}
      </Table>
    );
  },
});
