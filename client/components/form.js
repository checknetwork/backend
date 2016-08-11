import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstarp';


export const FormField = (field) => {
  let state = '';
  if (field.state === 'error' || field.error) {
    state = 'error';
  } else if (field.state === 'success' || field.success) {
    state = 'success';
  } else if (field.warning || field.warning) {
    state = 'warning';
  }

  const note = field.note || field.error || field.success || field.warning;
  const renderNote = note ? (<HelpBlock>{note}</HelpBlock>) : (null);

  const type = field.type || 'string';
  const others = {
    disabled: field.disabled,
    readOnly: field.readonly,
    name: field.name,
  };

  const others

  const renderInput = () => {
    return (<FormControl componentType="input" type={type} placeholder={field.hint} {...others}/>);
  };

  const renderText = () => {

  };

  return (
    <FormGroup controlId={field.name} validationState={state}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl type={type} value={this.state.value} placeholder={hint}/>
      <FormControl.Feedback />
      {hintText}
    </FormGroup>);
};

export const FormFields = ({fields, errors = {}}) => {

};

export const parseForm = (form = {}, ...names) => {
  const {elements} = form;

  return _.chain()
};
