import configUnderscore from './underscore';
import configMigrations from './migrations';
import configSyncedCron from './synced-cron';

export default function () {
  configUnderscore();
  configMigrations();
  configSyncedCron();
}
