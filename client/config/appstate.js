import {ReactiveDict} from 'meteor/reactive-dict';

export default function initAppState() {
  const AppState = new ReactiveDict();

  AppState.set('activeShop', null);

  const handleResize = () => {
    const view = document.querySelector('#view');
    AppState.set('viewWidth', view.clientWidth);
    AppState.set('viewHeight', view.clientHeight);
    AppState.set('windowWidth', window.innerWidth);
    AppState.set('windowHeight', window.innerHeight);
  };

  window.resize = _.debounce(handleResize, 300);

  handleResize();

  return AppState;
}
