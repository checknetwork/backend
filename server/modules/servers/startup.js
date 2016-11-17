import {Servers} from '/models';
import {Meteor} from 'meteor/meteor';

export default function () {
  const currentServerId = Servers.insert({createdAt: new Date, lastActivity: new Date});

  Servers.currentId = currentServerId;
}
