import React from 'react';
import {valuefyMap, valuefyAction, valuefy} from './utils';
import {Form, Modal, Header, Button, Icon} from 'semantic-ui-react';

export const ManagedForm = React.createClass({
  getInitialState() {
    return {changed: false};
  },

  renderGroup(group, key) {
    const props = _.pick(group, 'grouped', 'inline', 'className', 'as', 'widths');

    props.key = group.name || key;
    props.children = group.children ||
      this.renderElements(group.fields ||
        _.omit(group, 'grouped', 'inline', 'className', 'as', 'widths', 'children', 'type', 'group'));

    return (<Form.Group {...props}/>);
  },

  renderField(field, key) {
    const {data = {}, errors = {}, results = {}} = this.props;

    const getPropValue = () => {
      if (_.has(field, 'default')) {
        return valuefy(field.default, data);
      }

      if (_.has(field, 'value')) {
        return valuefy(field.value, data);
      }

      return data[field.name || key];
    };

    const mergedProps = [
      'className',
      'disabled',
      'error',
      'inline',
      'label',
      'required',
      'width',
      'label',
      'name',
    ];
    const props = valuefyMap(field, mergedProps, data, errors);

    props.name = props.name || key;
    props.key = props.name || key;
    props.defaultValue = getPropValue();

    if (!props.label || !props.label.length) {
      props.label = key.replace(/^(\S)/gi, (p) => p.toUpperCase());
    }

    if (field.type) {
      props.type = field.type;
    }

    if (field.text) {
      return (<Form.TextArea {...props}/>);
    }

    if (field.select) {
      return (<Form.Select {...props}/>);
    }

    return (<Form.Input {...props}/>);
  },

  renderElements(items) {
    return _.map(items, (field, key) => {
      if (field.group) {
        return this.renderGroup(field, key);
      }

      return this.renderField(field, key);
    });
  },

  renderButtons() {
    const {submit, cancel, reset, compact, data, errors} = this.props;
    const {changed} = this.state;

    const controlled = cancel || reset;

    const renderSubmit = () => {
      const defaults = {
        label: 'Submit',
        type: 'submit',
        positive: true,
        fluid: compact,
        disabled: (!changed && controlled),
      };
      const props = valuefyAction(submit, defaults, data, errors);
      return (<Form.Button {...props}/>);
    };

    const renderReset = () => {
      if (!controlled) {
        return (null);
      }

      const defaults = {
        label: 'Reset',
        fluid: compact,
        disabled: (!changed && controlled),
        onClick: (...args) => {
          // this.refs.form.reset();
          this.setState({changed: false});
        },
      };
      const props = valuefyAction(reset, defaults, data, errors);
      return (<Form.Button {...props}/>);
    };

    const renderCancel = () => {
      if (!cancel) {
        return (null);
      }

      const defaults = {
        label: 'Cancel',
        fluid: compact,
      };
      const props = valuefyAction(reset, defaults, data, errors);
      return (<Form.Button {...props}/>);
    };

    return (
      <div className={compact ? 'field' : 'fields'}>
        {renderSubmit()}{renderReset()}{renderCancel()}
      </div>
    );
  },

  render() {
    const {onSubmit, fields, auto, errors = {}, results = {}} = this.props;

    const error = errors.message;
    const success = results.message;
    const autocomlete = auto ? 'on' : 'off';

    const onChange = () => {
      if (this.props.reset && !this.state.changed) {
        this.setState({changed: true});
      }
    };

    return (
      <Form ref="form" onChange={onChange} onSubmit={onSubmit} autocomlete={autocomlete} error={error} success={success}>
        {this.renderElements(fields)}
        {this.renderButtons()}
      </Form>
    );
  },
});
