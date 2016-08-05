import {Meteor} from 'meteor/meteor';
import {SyncedCron} from 'meteor/percolate:synced-cron';
import {Migrations} from 'meteor/percolate:migrations';

// import configs
import initConfigs from './configs';

// import modules
import initAccountsAndUsers from './modules/users';
import initCountries from './modules/countries';
import initFeeds from './modules/feeds';
import initShops from './modules/shops';


// init configs
initConfigs();

// init modules
initAccountsAndUsers();
initCountries();
initFeeds();
initShops();


Meteor.startup(() => {
  const {MIGRATE_VERSION = 'latest'} = Meteor.settings;
  const {CRON_DISABLED = false} = Meteor.settings;

  // do migrations
  Migrations.migrateTo(MIGRATE_VERSION);

  // run cron jobs
  if (!CRON_DISABLED) {SyncedCron.start();}
});


// WebApp.rawConnectHandlers.use((req, res, next) => {
//   injectData(res, {name: 'megashop', text: 'avesome site'});
//   next();
// });
