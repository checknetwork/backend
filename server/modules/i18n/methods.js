import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Users, Countries, I18n} from '/models';

export default function () {
  if (Meteor.isDevelopment) {
    Meteor.methods({
      saveI18nRecord(name, lang, text) {
        check(name, String);
        check(lang, String);
        check(text, String);

        if (!Users.isSuperadmin(this.userId)) {
          throw new Meteor.Error(403, 'shared.accessDenied');
        }

        if (!Countries.find({lang}).count()) {
          throw new Meteor.Error(404, 'shared.nothingToUpdate');
        }

        I18n.upsert({name}, {name, [`${lang}`]: text});
      },
    });
  }
}
