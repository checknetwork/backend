import {Meteor} from 'meteor/meteor';
import {Users, I18n} from '/models';

export default function () {
  Meteor.publish('i18n', function i18n(lang = 'en') {
    const selector = Meteor.isDevelopment ? {} : {lang};

    return I18n.find(selector);
  });

  Meteor.publish('i18n.list', function i18nList() {
    if (!Users.isSuperadmin(this.userId)) {
      return this.ready();
    }

    return I18n.find({});
  });
}
