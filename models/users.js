import {Meteor} from 'meteor/meteor';

const Users = Meteor.users;

const ROLES = {
  SUPERADMIN: 'SUPERADMIN',
  MANAGER: 'MANAGER',
  PARTNER: 'PARTNER',
  WRITER: 'WRITER',
};

const userHasRole = (userId, ...roles) => {
  if (!userId) {
    return false;
  }

  const rolesList = _.chain(roles)
    .flatten()
    .compact()
    .value();

  return Users.find({_id: userId, role: {$in: rolesList}}).count() !== 0;
};

const userIsSuperadmin = (userId) => {
  if (!userId) {
    return false;
  }

  return Users.find({_id: userId, role: ROLES.SUPERADMIN}).count() !== 0;
};


Users.ROLES = ROLES;
Users.hasRole = userHasRole;
Users.isSuperadmin = userIsSuperadmin;

export {Users};
