import {Mongo} from 'meteor/mongo';

const Configs = new Mongo.Collection('configs');

const SECTIONS = {
  SHOPS: 'SHOPS',
  JOBS: 'JOBS',
  APP: 'APP',
  SERVERS: 'SERVERS',
  FEEDS: 'FEEDS',
};

Configs.SECTIONS = SECTIONS;

export {Configs};
