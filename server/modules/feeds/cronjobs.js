import {Meteor} from 'meteor/meteor';
import {SyncedCron} from 'meteor/percolate:synced-cron';

import moment from 'moment';
import request from 'request';
import fs from 'fs';
import path from 'path';

import {Feeds} from '/models';

/**
 * fetch file from feed's url and store them
 * @param  {String}    options._id  feed id (file names the same)
 * @param  {String}    options.url  feed url
 * @param  {Function}  callback     callback
 * @return  {Void}    none
 */
const fetchFileFromFeed = ({_id, url}, next) => {
  // const {FEEDS_FOLDER} = Meteor.settings;
  // const filePath = path.join(FEEDS_FOLDER, `${_id}.feed`);

  // const callback = Meteor.bindEnvironment(next);
  // let error = null;

  //  // do request and pipe to steram
  // request(url)
  //   .on('response', ({statusCode}) => {
  //     if (statusCode !== 200) {
  //       error = new Meteor.Error(statusCode, 'Feed server answer exception');
  //     }
  //   })
  //   .on('error', (err) => callback(err))
  //   // create write stream for chunked transfer
  //   .pipe(fs.createWriteStream(filePath))
  //     .on('error', (err) => callback(err || error))
  //     .on('finish', () => callback(error));
};

/**
 * mangement wrapper for file fetching
 * @param  {String}    options._id  feed _id
 * @param  {String}    options.url  feed file url
 * @param  {Function}  callback     callback
 * @return  {Void}    none
 */
const fetchFeed = ({_id, url}, callback) => {
  // const {FETCH, ERROR, PARSE} = Feeds.PROCESS;

  // // mark feed as FETCH to awoid from other jobs catch him!
  // Feeds.update(_id, {$set: {state: FETCH}});

  // // try to fetch from url
  // fetchFileFromFeed({_id, url}, (err) => {
  //   if (err) {
  //     // err! set state to ERROR (it wont be touched until admin has changed)
  //     const error = err.message || err.code;
  //     Feeds.update(_id, {$set: {error, state: ERROR}});
  //   } else {
  //     // thets ok, mark state is PARSE (ready to parse)
  //     Feeds.update(_id, {$set: {state: PARSE}});
  //   }

  //   return callback(err);
  // });
};

/**
 * finds any feed to fetch and push him to fetchFileFromFeed
 * @param  {Function}  callback  callback
 * @return  {Void}    none
 */
const fetchAllPossibleFeeds = (callback) => {
  // const {HOUR, HALF_DAY, ONE_DAY, THREE_DAYS, WEEK, TWO_WEEKS, MONTH} = Feeds.UPDATE_INTERVAL;
  // const {IDLE} = Feeds.PROCESS;

  // const intervals = [];
  // // fill intervals for all possible. We are expecting
  // // lastUpdate should be less then currentDate - interval
  // // or doesnt exists
  // intervals.push({lastUpdate: {$exists: false} });

  // intervals.push({interval: HOUR,       lastUpdate: {$lt: moment().subtract(1, 'h')} });
  // intervals.push({interval: HALF_DAY,   lastUpdate: {$lt: moment().subtract(12, 'h')} });
  // intervals.push({interval: ONE_DAY,    lastUpdate: {$lt: moment().subtract(1, 'd')} });
  // intervals.push({interval: THREE_DAYS, lastUpdate: {$lt: moment().subtract(3, 'd')} });
  // intervals.push({interval: WEEK,       lastUpdate: {$lt: moment().subtract(1, 'w')} });
  // intervals.push({interval: TWO_WEEKS,  lastUpdate: {$lt: moment().subtract(2, 'w')} });
  // intervals.push({interval: MONTH,      lastUpdate: {$lt: moment().subtract(1, 'M')} });

  // // find feeds w state=IDLE and one of interval rule
  // const selector = {
  //   $and: [
  //     {state: IDLE},
  //     {$or: intervals}
  //   ]
  // };

  // const feed = Feeds.findOne(selector, {fields: {url: 1}});

  // if (feed) {
  //   // if have one - fetch him out!
  //   fetchFeed(feed, (err) => {
  //     if (err) {return callback(null, `Error on feed id=${feed._id}`);}
  //     return callback(null, 'One feed fetched');
  //   });
  // } else {
  //   // no feeds? well done!
  //   return callback(null, 'No feeds been fetched');
  // }
};

export default function () {

  // const fetchAllPossibleFeedsSync = Meteor.wrapAsync(fetchAllPossibleFeeds);

  // SyncedCron.add({
  //   name: 'fetchAllPossibleFeeds',
  //   schedule: (later) => later.text('every 1 min'),
  //   job: () => fetchAllPossibleFeedsSync()
  // });
}
