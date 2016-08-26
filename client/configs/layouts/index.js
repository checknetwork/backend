import React from 'react';
import initSidebar from './sidebar';


export default function (AppState, Tracker) {
  const Sidebar = initSidebar(AppState, Tracker);

  const Root = ({content}) => {
    const renderedContent = _.isFunction(content) ? content() : (content || null);
    return (<div>{renderedContent}</div>);
  };


  const View = ({content}) => {
    const renderedContent = _.isFunction(content) ? content() : (content || null);
    return (<Root><Sidebar/>{renderedContent}</Root>);
  };

  const NotFound = ({message = 'This page is missed, sorry'}) => (
    <div>
      <h2>Page not found</h2>
      <p>{message}</p>
    </div>
  );

  return {View, Root, NotFound};
}
