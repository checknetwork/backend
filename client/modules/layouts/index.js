import React from 'react';
import initSidebar from './sidebar';


export default function initLayouts(state) {
  const Sidebar = initSidebar(state);


  const Layout = ({content}) => {
    const renderedContent = _.isFunction(content) ? content() : (content || null);
    return (<div><Sidebar/>{renderedContent}</div>);
  };

  return Layout;
}
