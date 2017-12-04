import React from 'react';
import classNames from 'classnames';

export const ReturnFlightSelector = ({ className }) => {
  const classes = classNames('waReturnFlightSelector', className);

  return (
    <div className={classes}>
      <h3>ReturnFlightSelector</h3>
    </div>
  );
};
