Package.describe({
  version: "1.0.0",
  name: "dev-env",
  // debugOnly: true
});


Package.onUse(function (api) {
  api.versionsFrom('1.4.0.1');
  api.imply('meteor-base');
  api.imply('mobile-experience');
});
