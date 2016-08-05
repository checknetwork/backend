import {Meteor} from 'meteor/meteor';
import {Migrations} from 'meteor/percolate:migrations';


export default function () {
  Migrations.config({
    log: Meteor.isDevelopment,
    logIfLatest: Meteor.isDevelopment
  });
}
