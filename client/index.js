import scope from './config/scope';


import initAuthModule from './modules/auth';
import initAppModule from './modules/app';


initAuthModule(scope);
initAppModule(scope);
