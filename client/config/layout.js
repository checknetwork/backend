import React from 'react';


export const Layout = ({content}) => (
  <div id="app">
    <div id="header"></div>
    <div id="main">{content()}</div>
  </div>
);

export const NotFound = ({message = 'This page is missed, sorry'}) => (
  <div>
    <h2>Page not found</h2>
    <p>{message}</p>
  </div>
);
