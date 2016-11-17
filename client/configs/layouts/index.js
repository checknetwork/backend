import React from 'react';
import initSidebar from './sidebar';
import {mountModal} from './modals';


export default function (AppState, Router, mount) {
  const Sidebar = initSidebar(AppState, Router);

  const Root = ({content, children}) => {
    const renderedContent = (_.isFunction(content) ? content() : (content || null)) || children;
    return (renderedContent);
  };


  const View = ({content, children}) => {
    const renderedContent = (_.isFunction(content) ? content() : (content || null)) || children;
    return (<Root><div className="app-root"><Sidebar/>{renderedContent}</div></Root>);
  };

  const NotFound = ({message = 'This page is missed, sorry'}) => (
    <div>
      <h2>Page not found</h2>
      <p>{message}</p>
    </div>
  );

  const mountView = (Component, ...others) => {
    if (Component) {
      const props = _.extend({}, ...others);
      mount(View, {content: () => (<Component {...props}/>)});
    }
  };

  const mountRoot = (Component, ...others) => {
    if (Component) {
      const props = _.extend({}, ...others);
      mount(Root, {content: () => (<Component {...props}/>)});
    }
  };

  return {View, Root, NotFound, mountView, mountRoot};
}
