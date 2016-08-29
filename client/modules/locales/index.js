import initCountriesModule from './countries';
import initI18nModule from './i18n';

export default function (scope) {
  const {Router} = scope;

  initI18nModule(scope);
  initCountriesModule(scope);

  Router.add({
    path: '/locales',
    triggersEnter: [Router.getRedirectTrigger('/locales/countries')],
  });
}
