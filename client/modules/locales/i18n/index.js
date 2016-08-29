import React from 'react';
import {Users} from '/models';
import {I18nListPage, I18nEditPage} from './components';

export default function (scope) {
  const {Router, Layouts, mount} = scope;

  Router.add({
    path: '/locales/i18n/:action?/:id?',
    triggersEnter: [Router.getRolesTrigger(Users.ROLES.SUPERADMIN)],
    action(params) {
      const actions = {
        list: I18nListPage,
        edit: I18nEditPage,
      };

      const Controller = actions[params.action] || actions.list;
      if (Controller) {
        mount(Layouts.View, {content: () => (<Controller params={params}/>)});
      }
    },
  });
}
