import React from 'react';
import initSidebar from './sidebar';
import {mountModal} from './modals';


export default function (AppState, Tracker) {
  const Sidebar = initSidebar(AppState, Tracker);

  const Root = ({content, children}) => {
    const renderedContent = (_.isFunction(content) ? content() : (content || null)) || children;
    return (<div>{renderedContent}</div>);
  };


  const View = ({content, children}) => {
    const renderedContent = (_.isFunction(content) ? content() : (content || null)) || children;
    return (<Root><Sidebar/>{renderedContent}</Root>);
  };

  const NotFound = ({message = 'This page is missed, sorry'}) => (
    <div>
      <h2>Page not found</h2>
      <p>{message}</p>
    </div>
  );

  return {View, Root, NotFound, mountModal};
}
