import {FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstarp';


export const PageFormInput = ({id, label, type = 'text', note, hint, name, value, error}) => {
  const errState = error ? 'error' : null;
  const hintText = (note || error) ? (<HelpBlock>{(note || error)}</HelpBlock>) : (null);

  return (
    <FormGroup controlId={id || name} validationState={errState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl type={type} value={this.state.value} placeholder={hint}/>
      <FormControl.Feedback />
      {hintText}
    </FormGroup>);
};

export const parseForm = (form = {}, ...names) => {
  const {elements} = form;

  return _.chain()
};
