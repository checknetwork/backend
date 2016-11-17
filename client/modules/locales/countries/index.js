import React from 'react';
import {Users} from '/models';
import {CountriesListPage, CountriesItemPage} from './components';

export default function (scope) {
  const {Router, Layouts} = scope;

  Router.add({
    name: 'localesCountries',
    path: '/locales/countries/:action?/:id?',
    triggersEnter: [Router.getRolesTrigger(Users.ROLES.SUPERADMIN)],
    action(params) {
      const views = {
        list: CountriesListPage,
        edit: CountriesItemPage,
        clone: CountriesItemPage,
      };

      Layouts.mountView(views[params.action] || views.list, params, {router: Router});
    },
  });
}
