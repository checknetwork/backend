import scope from './config';

import initLayout from './modules/layout';

import initAuthModule from './modules/auth';
import initLocalesModule from './modules/locales';


initLayout(scope);

initAuthModule(scope);
initLocalesModule(scope);
