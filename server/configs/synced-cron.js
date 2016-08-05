import {Meteor} from 'meteor/meteor';
import {SyncedCron} from 'meteor/percolate:synced-cron';

export default function () {
  SyncedCron.config({
    log: Meteor.isDevelopment
  });
}
