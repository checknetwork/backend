import {Mongo} from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';

const Shops = new Mongo.Collection('shops');


Shops.getShopCursorByHeader = (headers = {}) => {
  const {host} = headers;
  return Shops.find({host});
};

Shops.getShopByHeader = (headers = {}) => {
  const {host} = headers;
  return Shops.findOne({host});
};

if (Meteor.isClient) {
  Shops.getCurrentShop = () => {
    Shops.getShopByHeader(window.location);
  };
}

export {Shops};
