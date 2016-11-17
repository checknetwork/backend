import {Mongo} from 'meteor/mongo';

const Partners = new Mongo.Collection('partners');

const STATE = {
  NEW: 'NEW',
  IDLE: 'IDLE',
  DISABLED: 'DISABLED',
};


Partners.STATE = STATE;

export {Partners};

/**
 * Partners schema
 * @param  {String}  name   Partner's name
 * @param  {String}  url    Partner's site url
 * @param  {String}  state  Partner's state (one of STATE)
 * @return  {Void}   none
 */
// function (name, state)
