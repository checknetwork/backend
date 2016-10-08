import {I18n, Users} from '/models';
import {Meteor} from 'meteor/meteor';
import React from 'react';

export default function (AppState, Tracker) {
  I18n.changeLang = (lang = 'en') => {
    AppState.set({lang});
  };

  I18n.value = (name, lang, exists = false) => {
    const labels = I18n.findOne(name);
    if (Users.isSuperadmin(Meteor.userId()) && !exists) {
      Meteor.call('i18nReristerLabel', name);
    }
    return (labels || {})[lang];
  };

  I18n.label = (name, lang, exists = false) => {
    const langToAsk = (lang || AppState.get('lang') || 'en');
    return I18n.value(name, langToAsk, exists) || 'Label missed';
  };

  I18n.tag = (name) => {
    return (<span>{I18n.label(name)}</span>);
  };

  Tracker.autorun(() => {
    const lang = AppState.get('lang');
    Meteor.subscribe('i18n', lang);
  });

  Tracker.autorun(() => {
    if (!Users.isSuperadmin(Meteor.userId())) {
      AppState.set({langDockOpen: false});
    }
  });

  return I18n;
}

