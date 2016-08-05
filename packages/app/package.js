Package.describe({
  version: '1.0.0',
  name: 'app',
});


Package.onUse(function (api) {
  api.versionsFrom('1.4.0.1');
  api.imply('dev-env');

  api.imply('jquery', 'client');
  api.imply('reactive-dict', 'client');

  api.imply('meteor-base');
  api.imply('mobile-experience');
  api.imply('mongo');
  api.imply('static-html');
  api.imply('accounts-password');

  api.imply('kadira:flow-router');

  api.imply('percolate:synced-cron', 'server');
  api.imply('percolate:migrations', 'server');

  api.imply('fourseven:scss');

  // api.imply('standard-minifier-css');
  // api.imply('standard-minifier-js');
  api.imply('es5-shim');
  api.imply('ecmascript');
});
