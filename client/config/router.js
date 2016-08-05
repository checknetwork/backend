import {FlowRouter} from 'meteor/kadira:flow-router';
import {Accounts} from 'meteor/accounts-base';

const DEFAULT_ROUTES = {
  LOGIN: '/login',
  NOACCESS: '/denied',
  LOGOUT: '/logout',
  INDEX: '/',
};

export default function initRouter({Models, Meteor}) {
  const {Users} = Models;

  FlowRouter.DEFAULT_ROUTES = DEFAULT_ROUTES;

  FlowRouter.checkAuth = (ctx, redirect) => {
    if (!Meteor.userId()) {
      FlowRouter.requiredRoutePathname = ctx.path;
      redirect(DEFAULT_ROUTES.LOGIN);
    }
  };

  FlowRouter.getAuthTrigger = () => {
    return FlowRouter.checkAuth;
  };

  FlowRouter.getRolesTrigger = (...roles) => {
    return (ctx, redirect) => {
      FlowRouter.checkAuth(ctx, redirect);
      if (!Users.userHasRole(Meteor.userId(), ...roles)) {
        FlowRouter.requiredRoutePathname = ctx.path;
        redirect(DEFAULT_ROUTES.NOACCESS);
      }
    };
  };

  Accounts.onLogin(() => {
    const {requiredRoutePathname} = FlowRouter;
    if (requiredRoutePathname) {
      FlowRouter.requiredRoutePathname = null;
      FlowRouter.go(FlowRouter.requiredRoutePathname);
    }
  });

  Accounts.onLogout(() => {
    FlowRouter.go(DEFAULT_ROUTES.INDEX);
  });


  return FlowRouter;
}
