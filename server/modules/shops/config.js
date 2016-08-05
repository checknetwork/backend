
import {Shops} from '/models';
import {injectData} from '/server/lib';


const setupObserverForCache = () => {
  Shops.find({}).observe({
    added(doc) {
      if  (doc.host) {Shops._cache[doc.host] = doc;}
    },
    changed(doc, old) {
      if (old.host) {Shops._cache = _.omit(Shops._cache, old.host);}
      if (doc.host) {Shops._cache[doc.host] = doc;}
    },
    removed(old) {
      if (old.host) {Shops._cache = _.omit(Shops._cache, old.host);}
    }
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
  return Shops._cache[host.toLowerCase()];
};

export default function () {
  Shops._cache = {};
  setupObserverForCache();
  setupInitailDataForClient();
}
