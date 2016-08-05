import React from 'react';
import {Meteor} from 'meteor/meteor';

import Portlet from '/client/components/portlet';
import Alert from '/client/components/alert';

const extractValue = (form, ...args) =>
  args.reduce((memo, key) => {
    const value = (form[key] && form[key].value.trim());
    return _.extend({}, memo, {[`${key}`]: value});
  }, {});


const Login = React.createClass({
  displayName: 'Login',

  getInitialState() {
    return {error: null};
  },

  onSubmit(e) {
    e.preventDefault();
    const {email, password} = extractValue(e.target, 'email', 'password');
    this.setState({error: null});

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        return this.setState({error: true});
      }

      return (this.props.onLogin && this.props.onLogin());
    });
  },

  render() {
    const message = !this.state.error ? (<div/>) : (
      <Alert type="danger" content="Login failed, wrong email or password"/>
    );

    const content = (
      <form className="form-horizontal" name="login" action="/" onSubmit={this.onSubmit}>
        <div className="form-group">
          <label htmlFor="login-email" className="col-sm-2 control-label">Email</label>
          <div className="col-sm-10">
            <input name="email" type="email" className="form-control" id="login-email" placeholder="Email" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="col-sm-2 control-label">Password</label>
          <div className="col-sm-10">
            <input name="password" type="password" className="form-control" id="login-password" placeholder="Password" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10 col-sm-offset-2">
            {message}
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary">Sign in</button> &nbsp;
            <button type="button" className="btn btn-default">Forgot Password?</button>
          </div>
        </div>
      </form>
    );

    return (
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div className="margin-top margin-bottom text-center">
          <img role="presentation" src="/assets/images/tcn-logo.png" className="brand-logo" />
        </div>
        <Portlet>
          {content}
        </Portlet>
      </div>
    );
  },
});

const Logout = ({onLogout}) => {
  const onSubmit = () => {
    Meteor.logout();
    onLogout('/');
  };

  const onCancel = () => {
    onLogout();
  };

  return (
    <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
      <div className="margin-top margin-bottom text-center">
        <img role="presentation" src="/assets/images/tcn-logo.png" className="brand-logo" />
      </div>
      <Portlet>
        <form className="form-horizontal" name="logout" action="/" onSubmit={onSubmit}>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Logout</button> &nbsp;
              <button type="button" className="btn btn-default" onClick={onCancel}>Chancel</button>
            </div>
          </div>
        </form>
      </Portlet>
    </div>
  );
};


export default function ({FlowRouter, Layout, mount}) {
  const redirectOnLogin = (path, handle) => {
    const routePath = path || FlowRouter.lastRoutePath;
    return (handle && handle(routePath)) || FlowRouter.go(routePath);
  };

  const redirectOnLogout = (path, handle) => {
    const routePath = path || FlowRouter.lastRoutePath || '/';
    return (handle && handle(routePath)) || FlowRouter.go(routePath);
  };

  const redirectLogged = (ctx, redirect) => {
    if (Meteor.userId()) {
      redirectOnLogin('/app/dashboard', redirect);
    }
  };

  const redirectNotLogged = (ctx, redirect) => {
    if (!Meteor.userId()) {
      redirectOnLogin('/', redirect);
    }
  };

  FlowRouter.route('/login', {
    triggersEnter: [redirectLogged],
    action() {
      return mount(Layout, {
        content() {
          return (<Login onLogin={redirectOnLogin}/>);
        },
      });
    },
  });

  FlowRouter.route('/logout', {
    triggersExit: [redirectNotLogged],
    action() {
      return mount(Layout, {
        content() {
          return (<Logout onLogout={redirectOnLogout}/>);
        },
      });
    },
  });
}
