import React from 'react';

export const Alert = ({type, content}) => {
  const alertClass = type ? `alert alert-${type}` : 'alert alert-default';

  return (
    <div className={alertClass}>
      {content}
    </div>
  );
};
