import React from 'react';

export default ({title, actions, children}) => {
  const renderActions = () => {
    const actionsMap = _.map(actions, ({label, primary, href, handler}, key) => (
      <li key={key} onClick={handler}>
        <a href={href}>{label}</a>
      </li>
    ));

    return (
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          {actionsMap}
        </ul>
      </div>
    );
  };

  const renderHeader = () => (
    <nav className="navbar navbar-default page--header">
      <div className="container">
        <div className="navbar-header">
          <span className="navbar-brand">{title}</span>
        </div>
        {renderActions()}
      </div>
    </nav>
  );

  const renderBody = () => (
    <div className="page--body">
      <div className="container">
        {children}
      </div>
    </div>
  );

  return (
    <div className="page--container">
      <div className="page--body has-header">
        {renderHeader()}
        {renderBody()}
      </div>
    </div>
  );
};
