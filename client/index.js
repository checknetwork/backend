import scope from './config';

import initLayout from './modules/layout';

import initAuthModule from './modules/auth';
import initLocalesModule from './modules/locales';


scope.Layout = initLayout(scope);

initAuthModule(scope);
initLocalesModule(scope);
