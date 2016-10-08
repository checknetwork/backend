import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';

import {I18n} from '/models';
import {Meteor} from 'meteor/meteor';

export const dialogSave = (methodName, data = {}, ...others) => {
  const options = others.length > 1 ? others[0] : {};
  const callback = others.length > 1 ? others[1] : others[0];

  swal({
    title: I18n.label('common.actions.save'),
    text: options.text || I18n.value('common.actions.save.description',
    type: 'info',
    showCancelButton: true,
    closeOnConfirm: false,
    showLoaderOnConfirm: true,
  }, () => {
    Meteor.call(methodName, data, (err, res) => {
      if (err) {
        swal(I18n.label('common.actions.error'), options.error || I18n.label(err.message, null, true), 'error');
      } else {
        swal(I18n.label('common.actions.success'), options.success || '', 'success');
      }
      callback(err, res);
    })
  });
};
