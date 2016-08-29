import {mount, withOptions} from 'react-mounter';

const modalMount = withOptions({rootId: 'modal-root'}, mount);
let modals = {};

const modalsRoot = () => {
  const modalsMap = _.map(modals, ({c, p = {}}, key) => {
    return (<c key={key} {...p}/>);
  });

  return (
    <div>{modalsMap}</div>
  );
};

const mountAllModals = () => {
  modalMount(modalsRoot);
};

export const mountModal = (name, c, p = {}) => {
  _.extend(p, {unmount() {
    modals = _.omit(modals, name);
    mountAllModals();
  }});

  modals[name] = {c, p};
  mountAllModals();
};
