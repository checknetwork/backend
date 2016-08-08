import React from 'react';

export const Portlet =  ({icon, footer, title, actions, children}) => {
  const Icon = icon ? (<i className={icon}/>) : (null);

  const Footer = footer ?
    (<div className="panel-footer">{footer}</div>) : (null);

  const PanelHeading = (icon || title) ?
    (<div className="panel-heading">
      <strong className="panel-title">{Icon} {title}</strong>
      <div className="actions">{actions}</div>
    </div>) : (null);

  return (
    <div className="panel panel-portlet">
      {PanelHeading}
      <div className="panel-body">
        {children}
      </div>
      {Footer}
    </div>
  );
};
