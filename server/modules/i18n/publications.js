import {Meteor} from 'meteor/meteor';
import {Users, I18n} from '/models';

export default function () {
  Meteor.publish('i18n', function i18n(lang = 'en') {
    const selector = Meteor.isDevelopment ? {} : {lang};

    return I18n.find(selector);
  });
}
