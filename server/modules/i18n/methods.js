import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Users, I18n} from '/models';

export default function () {
  if (Meteor.isDevelopment) {
    Meteor.methods({
      i18nReristerLabel(name) {
        this.unblock();
        check(name, String);


        if (!Users.isSuperadmin(this.userId)) {
          throw new Meteor.Error(403, 'shared.accessDenied');
        }

        const section = name.split('.')[0];
        if (!section) {
          throw new Meteor.Error(403, 'shared.dataCorrupted');
        }

        I18n.upsert({_id: name}, {$set: {section}});
      },
    });
  }
}
