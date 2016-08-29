import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Users, I18n, Countries} from '/models';

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

        const data = {
          section,
          version: I18n.version,
          state: I18n.STATE.EMPTY,
        };

        I18n.upsert(name, {$set: data}, () => {});
      },

      i18nSaveEdit(data) {
        this.unblock();
        check(data, Object);

        throw new Meteor.Error(202, 'Message', {fields: {}});
      },
    });
  }
}
