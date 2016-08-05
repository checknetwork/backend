import * as Models from '/models';
import {Meteor} from 'meteor/meteor';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {Layout, NotFound} from './layout';
import {mount} from 'react-mounter';

import initI18nModule from './i18n';

const AppState = new ReactiveDict();

AppState.set('selectedShop', null);

const handleResize = () => {
  const view = document.querySelector('#view');
  AppState.set('viewWidth', view.clientWidth);
  AppState.set('viewHeight', view.clientHeight);
  AppState.set('windowWidth', window.innerWidth);
  AppState.set('windowHeight', window.innerHeight);
};

window.resize = _.debounce(handleResize, 300);

FlowRouter.triggers.exit([(ctx) => {
  const {path} = ctx;
  if (path !== '/login' && path !== '/logout') {
    FlowRouter.lastRoutePath = ctx.path;
  }

  if (!FlowRouter.lastRoutePath) {
    FlowRouter.lastRoutePath = '/';
  }
}]);

initI18nModule(AppState);

export default {
  Meteor,
  Models,
  FlowRouter,
  AppState,
  mount,
  Layout,
  NotFound,
};
