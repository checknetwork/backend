import React from 'react';

export default ({type, content}) => {
  const alertClass = type ? `alert alert-${type}` : 'alert alert-default';

  return (
    <div className={alertClass}>
      {content}
    </div>
  );
};
