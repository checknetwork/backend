import 'meteor/tracker';

import {Meteor} from 'meteor/meteor';
import {mount} from 'react-mounter';

import initAppState from './appstate';
import initRouter from './router';
import initI18n from './i18n';
import initLayouts from './layouts';

const AppState = initAppState();
const Router = initRouter();

// dependent on scopes
// const i18n = initI18n(AppState);
const i18n = {};
const Layouts = initLayouts(AppState, Router, mount);


export default {Meteor, AppState, Router, Layouts, mount, i18n};
