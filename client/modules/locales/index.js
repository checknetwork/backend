import initCountriesModule from './countries';

export default function (scope) {
  const {Router} = scope;

  initCountriesModule(scope);

  Router.add({
    path: '/locales',
    triggersEnter: [Router.getRedirectTrigger('/locales/countries')],
  });
}
