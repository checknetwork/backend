import React from 'react';
import {I18n} from '/models';
import {Meteor} from 'meteor/meteor';
import {Panel, Row, Col, Grid, Button, ButtonToolbar, Image} from 'react-bootstrap';
import {Fields, parseForm} from '/client/components';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {errors: {}};
  }

  onSubmit(e) {
    e.preventDefault();

    const {email, password} = parseForm(e.target);
    this.setState({errors: {}});

    Meteor.loginWithPassword(email, password, (err) => {
      if (!err) {
        return;
      }

      this.setState({errors: {
        email: I18n.tag('common.login.wrongAuthData'),
        password: I18n.tag('common.login.wrongAuthData'),
      }});
    });
  }

  render() {
    const {errors} = this.state;
    const fields = {
      email: {
        type: 'string',
        label: I18n.tag('common.login.email'),
      },
      password: {
        type: 'password',
        label: I18n.tag('common.login.password'),
      },
    };

    return (
      <Grid>
        <Row style={{paddingTop: '25vh'}}>
          <Col sm={6} smOffset={3} md={4} mdOffset={4}>
            <Row style={{paddingBottom: 20}}>
              <Col xs={6} xsOffset={3} sm={8} smOffset={2}>
                <Image src="/assets/images/tcn-logo.png" responsive/>
              </Col>
            </Row>
            <Panel>
              <form action="/" name="login" onSubmit={(e) => this.onSubmit(e)}>
                <Fields fields={fields} errors={errors}/>
                <ButtonToolbar>
                  <Button bsStyle="primary" type="submit">{I18n.tag('common.login.login')}</Button>
                  <Button type="button">{I18n.tag('common.login.forgotpassword')}</Button>
                </ButtonToolbar>
              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}


export default function (scope) {
  const {Router, mount, Layouts} = scope;

  Router.add({
    path: Router.DEFAULT_ROUTES.LOGIN,
    action() {
      mount(Layouts.Root, {content: (<Login/>)});
    },
  });
}
