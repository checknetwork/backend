import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';

export const parseForm = (form = {}, ...names) => {
  const {elements} = form;

  return _.chain(elements)
    .filter(({name, tagName = ''}) => {
      return name && (['input', 'select', 'textarea'].includes(tagName.toLowerCase()))
        && (!names.length || names.includes(name));
    })
    .reduce((memo, {name, value, checked, valueAsNumber, valueAsDate, innerText}) => {
      const res = valueAsDate || valueAsNumber || value || checked || innerText;
      return _.extend({}, memo, {[`${name}`]: res});
    }, {})
    .value();
};

export const Field = (field) => {
  let state;
  if (field.state === 'error' || field.error) {
    state = 'error';
  } else if (field.state === 'success' || field.success) {
    state = 'success';
  } else if (field.warning || field.warning) {
    state = 'warning';
  }

  const note = field.note || field.error || field.success || field.warning;
  const label = field.label || field.hint;
  const hint = field.hint || field.label;
  const type = field.type || 'string';
  const others = {
    disabled: field.disabled,
    readOnly: field.readonly,
    name: field.name,
  };

  const renderLabel = () => {
    return label ? (<ControlLabel>{label}</ControlLabel>) : (null);
  };

  const renderNote = () => {
    return note ? (<HelpBlock>{note}</HelpBlock>) : (null);
  };

  const renderInput = () => {
    others.type = type === 'string' ? 'text' : type;
    others.value = field.value;
    others.placeholder = hint;
    return (<FormControl {...others}/>);
  };

  const renderText = () => {
    others.value = field.value;
    others.placeholder = hint;
    return (<FormControl componentType="textarea" {...others}/>);
  };

  const renderSelect = () => {
    others.value = field.value;
    others.placeholder = hint;
    const options = _.map(field.options, ({value, text}) => {
      return (<option key={value} value={value}>{text || value}</option>);
    });
    return (<FormControl componentType="select" {...others}>{options}</FormControl>);
  };


  const renderControl = () => {
    if (['string', 'number', 'date', 'email', 'password'].includes(type)) {
      return renderInput();
    }

    if (type === 'text') {
      return renderText();
    }

    if (type === 'select') {
      return renderSelect();
    }

    if (type === 'static') {
      return (<FormControl.Static>{field.value}</FormControl.Static>);
    }

    return (null);
  };

  const groupProps = {
    controlId: field.name,
    key: name,
  };

  if (state) {
    groupProps.validationState = state;
  }

  return (
    <FormGroup {...groupProps}>
      {renderLabel()}
      {renderControl()}
      {renderNote()}
    </FormGroup>);
};

export const Fields = ({fields = {}, data = {}, errors = {}}) => {
  const fieldsList = _.map(fields, (field, key) => {
    const name = field.name || key;
    const value = field.value || data[name];
    const error = field.error || errors[name];

    const fieldProps = _.extend({}, field, {name, value, error});
    return (<Field key={name} {...fieldProps}/>);
  });

  return (<div>{fieldsList}</div>);
};
