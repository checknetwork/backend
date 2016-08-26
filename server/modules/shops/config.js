import {WebApp} from 'meteor/webapp';
import {Shops} from '/models';
import {injectData} from '/server/lib';


const setupObserverForCache = () => {
  Shops.find({}).observe({
    added(doc) {
      if (doc.host) {Shops.cachedDocs[doc.host] = doc;}
    },
    changed(doc, old) {
      if (old.host) {Shops.cachedDocs = _.omit(Shops.cachedDocs, old.host);}
      if (doc.host) {Shops.cachedDocs[doc.host] = doc;}
    },
    removed(old) {
      if (old.host) {Shops.cachedDocs = _.omit(Shops.cachedDocs, old.host);}
    },
  });
};

const setupInitailDataForClient = () => {
  WebApp.rawConnectHandlers.use((req, res, next) => {
    const shop = Shops.getFromCache(req.headers);

    if (shop) {injectData(res, {shop});}
    next();
  });
};

Shops.getFromCache = ({host}) => {
  return Shops.cachedDocs[host.toLowerCase()];
};

export default function () {
  Shops.cachedDocs = {};
  setupObserverForCache();
  setupInitailDataForClient();
}
