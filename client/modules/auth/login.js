import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Grid, Segment, Image, Button, Divider, Modal, Header} from 'semantic-ui-react';
import {ManagedForm} from '/client/components';

const Login = React.createClass({
  getInitialState() {
    return {resetModalOpened: false};
  },

  handleResetModal() {
    const resetModalOpened = !this.state.resetModalOpened;
    this.setState({resetModalOpened});
  },

  render() {
    const formProps = {
      fields: {
        email: {
          required: true,
        },
        password: {
          type: 'password',
          required: true,
        },
      },
      compact: true,
      submit: 'Login',
      onSubmit(e, form) {
        e.preventDefault();
        Meteor.loginWithPassword(form.email, form.password);
      },
    };

    return (
      <Grid verticalAlign="middle" centered>
        <Grid.Column style={{maxWidth: 380}}>
          <Image src="/assets/images/tcn-logo.png" fluid style={{padding: 20}}/>
          <Segment raised>
            <ManagedForm {...formProps}/>
          </Segment>
          <Button fluid onClick={this.handleResetModal}>Forgot password</Button>
          <Divider hidden fitted/>
          <Button fluid as="a" href="#">Become a partner</Button>

          <ForgotPasswordModal open={this.state.resetModalOpened} handleClose={this.handleResetModal}/>
        </Grid.Column>
      </Grid>
    );
  },
});

const ForgotPasswordModal = ({open, handleClose}) => {
  const formProps = {
    fields: {
      email: {
        type: 'string',
        label: 'Email',
      },
    },
    compactWidth: true,
    submitText: 'Reset password',
    onSubmit(e, formData) {
      e.preventDefault();
      Accounts.forgotPassword(formData, handleClose);
    },
    onCancel() {
      handleClose();
    },
  };

  return (
    <Modal basic open={open} onClose={handleClose}>
      <Modal.Content>
        <Modal.Description>
          <Grid verticalAlign="middle" centered>
            <Grid.Column style={{maxWidth: 380}}>
              <Segment raised>
                <Header>
                  Reset password
                  <Header.Subheader as="p">
                    Fill your email address you are registered with and
                    we send you a secret link to reset the password
                  </Header.Subheader>
                </Header>
                <ManagedForm {...formProps}/>
              </Segment>
            </Grid.Column>
          </Grid>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};


export default function (scope) {
  const {Router, mount, Layouts} = scope;

  Router.add({
    path: Router.DEFAULT_ROUTES.LOGIN,
    action() {
      mount(Layouts.Root, {content: (<Login/>)});
    },
  });
}
