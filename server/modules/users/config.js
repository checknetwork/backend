import {Accounts} from 'meteor/accounts-base';
import {Users} from '/models';
import {Meteor} from 'meteor/meteor';


/**
 * reset SUPERADMIN role and password for all superadmins
 * or create them if no exists
 * @return {[type]} [description]
 */
const resetSuperAdmins = () => {
  const {RESET_SUPERADMINS} = Meteor.settings;
  const {SUPERADMIN} = Users.ROLES;

  // return if no reset option and if we have at least 1 superadmin
  if (!Boolean(RESET_SUPERADMINS)) {
    return;
  }

  // remove superadmin role for all the users
  Users.update({role: SUPERADMIN}, {$unset: {role: ''}}, {multi: true});

  // for each from list
  RESET_SUPERADMINS.forEach(({name, email, password}) => {
    // try to find by email
    const user = Accounts.findUserByEmail(email);
    let userId = user && user._id;

    // if found just reset pass, else create new user
    if (userId) {
      Accounts.setPassword(userId, password, {logout: true});
    } else {
      const options = {
        email,
        password,
        profile: {name},
      };

      userId = Accounts.createUser(options);
    }

    // if user found or created, add superadmin role for him!
    if (userId) {
      Users.update(userId, {$set: {role: SUPERADMIN}});
    }
  });
};

/**
 * apply default Accounts config
 * we dont send emails and disable everyone can register!
 * @return {[type]} [description]
 */
const configureAccountsService = () => {
  Accounts.config({
    sendVerificationEmail: false,
    forbidClientAccountCreation: true
  });
};

export default function () {
  configureAccountsService();
  resetSuperAdmins();
}
