import {Mongo} from 'meteor/mongo';

const I18n = new Mongo.Collection('i18n');

I18n.STATE = {
  DONE: 'DONE',
  EMPTY: 'EMPTY',
  MISSED: 'MISSED',
};

I18n.version = 2;

export {I18n};
