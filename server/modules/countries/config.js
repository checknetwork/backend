import {Countries} from '/models';


const setupObserverForCache = () => {
  Countries.find({}).observe({
    added(doc) {
      if (doc.host) {Countries.cachedDocs[doc.host] = doc;}
    },
    changed(doc, old) {
      if (old.host) {Countries.cachedDocs = _.omit(Countries.cachedDocs, old.host);}
      if (doc.host) {Countries.cachedDocs[doc.host] = doc;}
    },
    removed(old) {
      if (old.host) {Countries.cachedDocs = _.omit(Countries.cachedDocs, old.host);}
    },
  });
};


export default function () {
  Countries.cachedDocs = {};
  setupObserverForCache();
}
