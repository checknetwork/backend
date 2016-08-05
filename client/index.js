import scope from './config';


import initAuthModule from './modules/auth';
import initLocalesModule from './modules/locales';


initAuthModule(scope);
initLocalesModule(scope);
