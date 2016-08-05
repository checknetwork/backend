import React from 'react';
import Sidebar from './sidebar';

import {CountriesList, CountriesEdit} from './countries';

const routes = {
  countriesList: {path: '/countries', Component: CountriesList},
  countriesEdit: {path: '/countries/:countryId', Component: CountriesEdit},
};


export default function ({FlowRouter, Meteor, mount}) {
  const authRequired = (ctx, redirect) => {
    _.extend(FlowRouter, {loginNextPath: ctx.path});

    if (!Meteor.userId()) {
      redirect('/login');
    }
  };

  // app modules prefix "/app", auth required!
  const authAppRoutes = FlowRouter.group({
    prefix: '/app',
    triggersEnter: [authRequired],
  });

  const AppRoot = ({Component, route, params = {}}) => (
    <div>
      <Sidebar route={route}/>
      <Component {...params}/>
    </div>
  );

  _.map(routes, ({Component, path}, route) => {
    authAppRoutes.route(path, {
      action(params) {mount(AppRoot, {Component, params, route});},
    });
  });

  // default "Not found route"
  // authAppRoutes.route('/:this?/:not?/:found?', {
  //   action() {renderViewIntoLayout(NotFound);},
  // });
}
