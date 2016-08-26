import scope from './configs';
import initAuthModule from './modules/auth';
import initLocalesModule from './modules/locales';

const {Meteor, Router} = scope;

initAuthModule(scope);
initLocalesModule(scope);

Meteor.startup(() => {
  Router.add({
    path: '/',
    triggersEnter: [Router.getRedirectTrigger(Router.DEFAULT_ROUTES.LOGIN)],
    action() {
      throw new Meteor.Error(403, 'Access denied');
    },
  });

  Router.notFound = {
    action() {
      Router.go(Router.DEFAULT_ROUTES.LOGIN);
    },
  };

  Router.start();
});

