import {Meteor} from 'meteor/meteor';
import {Users} from '/models';

export default function () {
  Meteor.publish(null, function defaultUserInfo() {
    if (!this.userId) {
      return this.ready();
    }

    return Users.find({_id: this.userId}, {fields: {role: 1}});
  });
}
