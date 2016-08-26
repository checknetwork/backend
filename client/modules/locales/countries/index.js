import React from 'react';
import {Users} from '/models';
import {CountriesListPage} from './components';

export default function (scope) {
  const {Router, Layouts, mount} = scope;

  Router.add({
    path: '/locales/countries/:action?/:id?',
    triggersEnter: [Router.getRolesTrigger(Users.ROLES.SUPERADMIN)],
    action(params) {
      const actions = {
        list: CountriesListPage,
        edit: null,
        clone: null,
      };

      const Controller = actions[params.action] || actions.list;
      if (Controller) {
        mount(Layouts.View, {content: () => (<CountriesListPage {...params}/>)});
      }
    },
  });
}
