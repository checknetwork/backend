import {Meteor} from 'meteor/meteor';
import {Countries} from '/models';

export default function () {
  Meteor.publish(null, function () {
    if (!this.userId) {
      return this.ready();
    }
    return Countries.find({});
  });
}
