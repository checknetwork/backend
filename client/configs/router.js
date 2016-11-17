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

  const isLogged = () =>
    Meteor.userId() && !Meteor.loggingIn();

  Router.checkAuth = () =>
    isLogged();

  Router.checkRoles = (roles) =>
    isLogged() && Users.hasRole(Meteor.userId(), ...roles);

  Router.getRedirectTrigger = (path) =>
    (ctx, redirect) => redirect(path);

  Router.getAuthTrigger = () =>
    (ctx, redirect) => {
      if (!Router.checkAuth()) {
        Router.requiredRoutePathname = ctx.path;
        return redirect(DEFAULT_ROUTES.LOGIN);
      }

      return ctx;
    };

  Router.getRolesTrigger = (...roles) =>
    (ctx, redirect) => {
      if (!Router.checkAuth()) {
        Router.requiredRoutePathname = ctx.path;
        return redirect(DEFAULT_ROUTES.LOGIN);
      }
      if (!Router.checkRoles(roles)) {
        Router.requiredRoutePathname = ctx.path;
        return redirect(DEFAULT_ROUTES.NOACCESS);
      }

      return ctx;
    };

  Router.add = (params = {}) => {
    const {path, ...others} = params;
    Router.route(path, others);
  };

  Router.start = () => {
    if (!Meteor.loggingIn()) {
      return Router.initialize();
    }

    return Router.wait();
  };

  Router.routeProps = (params = {}) => {
    return _.extend(params, {redirect: Router.go});
  };

  Accounts.onLogin(() => {
    if (!Router._initialized) {
      Router.start();
    }

    if (Router.requiredRoutePathname) {
      return Router.go(Router.requiredRoutePathname);
    }

    return Router.go(DEFAULT_ROUTES.INDEX);
  });

  Accounts.onLoginFailure(() => {
    if (!Router._initialized) {
      Router.start();
    }

    Router.go(DEFAULT_ROUTES.LOGIN);
  });

  Accounts.onLogout(() => {
    Router.requiredRoutePathname = null;
    Router.go(DEFAULT_ROUTES.INDEX);
  });

  return Router;
}
