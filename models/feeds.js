import {Mongo} from 'meteor/mongo';

const Feeds = new Mongo.Collection('feeds');

const STATE = {
  NEW      : 'NEW',
  IDLE     : 'IDLE',
  FETCH    : 'FETCH',
  PARSE    : 'PARSE',
  ERROR    : 'ERROR',
  DISABLED : 'DISABLED'
};

const UPDATE_INTERVAL = {
  HOUR       : 'HOUR',
  HALF_DAY   : 'HALF_DAY',
  ONE_DAY    : 'ONE_DAY',
  THREE_DAYS : 'THREE_DAYS',
  WEEK       : 'WEEK',
  TWO_WEEKS  : 'TWO_WEEKS',
  MONTH      : 'MONTH',
  MANUAL     : 'MANUAL'
};

const FILE_FORMAT = {
  XML  : 'XML',
  CSV  : 'CSV',
  JSON : 'JSON'
};

Feeds.STATE = STATE;
Feeds.UPDATE_INTERVAL = UPDATE_INTERVAL;
Feeds.FILE_FORMAT = FILE_FORMAT;

export default Feeds;

/**
 * Feeds schema
 * @param  {String}  state      indicates feeds state (one of STATE)
 * @param  {String}  partnerId  partner's id
 * @param  {Date}    lastUpdate where products was imported last time
 * @param  {String}  interval   update interval (one of UPDATE_INTERVAL)
 * @param  {String}  format     feed file format (one of FILE_FORMAT)
 * @param  {String}  url        feed url (with handlebars), no matter if interval = MANUAL
 * @param  {Object}  parser     collection of rules for parser
 * @param  {String}  error      last error message
 * @return {Void}               nothing
 */
// function (enabled, partnerId, lastUpdate, interval, format, url, parser, staged, file)


/**
 * parser schema
 * @param  {String|Number}  entry             start line for CSV, node name for XML, field of [] for JSON
 * @param  {String|Number}  options.id        product id, stringified (evaluate)
 * @param  {String|Number}  options.code      vendor code or origin sku (evaluate)
 * @param  {String|Number}  options.group     product group (evaluate)
 * @param  {String}         options.name      product name (evaluate)
 * @param  {String}         options.text      product description (evaluate)
 * @param  {String|Number}  options.price     product price, parsed to int
 * @param  {String|Number}  options.oldPrice  product old price, parsed to int
 * @param  {String}         options.url       product page (target) url
 * @param  {String|Array}   options.images    if set, tryes to evaluate thumb image url (evaluate)
 * @param  {String|Array}   options.thumbs    if set, tryes to evaluate thumb image url (evaluate)
 * @param  {String}         options.type      product type (evaluate)
 * @param  {String}         options.color     product color (evaluate)
 * @param  {String|Number}  options.size      product size (evaluate)
 * @param  {String}         options.brand     product brand or vendor (evaluate)
 * @param  {String}         url               url constructor rule (handlebars)
 * @return {Void}                             none
 */
// function (entry, {id, code, group, name, text, price, oldPrice, url, images, type, color, size, brand}, url)
