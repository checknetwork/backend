import * as Models from '/models';
import {Meteor} from 'meteor/meteor';
import {mount} from 'react-mounter';
import {Tracker} from 'tracker-component';

import initAppState from './appstate';
import initRouter from './router';
import initI18n from './i18n';

const scope = {Models, Meteor, Tracker, mount};

scope.AppState = initAppState(scope);
scope.Router = initRouter(scope);
scope.i18n = initI18n(scope);

export default scope;
