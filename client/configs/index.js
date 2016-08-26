import 'meteor/tracker';

import * as Models from '/models';
import {Meteor} from 'meteor/meteor';
import {mount} from 'react-mounter';
import Tracker from 'tracker-component';

import initAppState from './appstate';
import initRouter from './router';
import initI18n from './i18n';
import initLayouts from './layouts';

const AppState = initAppState();
const Router = initRouter();

// dependent on scopes
const i18n = initI18n(AppState, Tracker);
const Layouts = initLayouts(AppState, Tracker);

export default {Models, Meteor, Tracker, AppState, Router, Layouts, mount, i18n};
