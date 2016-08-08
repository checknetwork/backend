import React from 'react';
import initSidebar from './sidebar';


export default function initLayouts(scope) {
  const Sidebar = initSidebar(scope);

  const Root = ({content}) => {
    const renderedContent = _.isFunction(content) ? content() : (content || null);
    return (<div>{renderedContent}</div>);
  };


  const Layout = ({content}) => {
    const renderedContent = _.isFunction(content) ? content() : (content || null);
    return (<Root><Sidebar/>{renderedContent}</Root>);
  };

  _.extend(scope, {Layout, Root});
}
