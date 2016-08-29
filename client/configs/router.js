import {FlowRouter} from 'meteor/kadira:flow-router';
import {Accounts} from 'meteor/accounts-base';
import {Users} from '/models';
import {Meteor} from 'meteor/meteor';

const DEFAULT_ROUTES = {
  LOGIN: '/login',
  NOACCESS: '/denied',
  LOGOUT: '/logout',
  INDEX: '/',
};

export default function () {
  const Router = FlowRouter;

  Router.DEFAULT_ROUTES = DEFAULT_ROUTES;

  FlowRouter.wait();

  Router.checkAuth = (ctx, redirect) => {
    if (!Meteor.userId()) {
      Router.requiredRoutePathname = ctx.path;
      redirect(DEFAULT_ROUTES.LOGIN);
    }
  };

  Router.getAuthTrigger = () => {
    return Router.checkAuth;
  };

  Router.getRedirectTrigger = (path) => {
    return (ctx, redirect) => {
      redirect(path);
    };
  };

  Router.getRolesTrigger = (...roles) => {
    return (ctx, redirect) => {
      Router.checkAuth(ctx, redirect);
      if (!Users.hasRole(Meteor.userId(), ...roles)) {
        Router.requiredRoutePathname = ctx.path;
        redirect(DEFAULT_ROUTES.NOACCESS);
      }
    };
  };

  Router.add = (params = {}) => {
    const {path, ...others} = params;
    FlowRouter.route(path, others);
  };

  Router.start = () => {
    if (!Meteor.loggingIn()) {
      Router.started = true;
      FlowRouter.initialize();
    }
  };

  Accounts.onLogin(() => {
    const {requiredRoutePathname} = Router;
    if (!Router.started) {
      Router.start();
    }

    if (requiredRoutePathname) {
      Router.requiredRoutePathname = null;
      Router.go(requiredRoutePathname);
    }
  });

  Accounts.onLoginFailure(() => {
    if (!Router.started) {
      Router.start();
    }
  });

  Accounts.onLogout(() => {
    Router.go(DEFAULT_ROUTES.INDEX);
  });

  return Router;
}
