import React from 'react';
import classNames from 'classnames';

export const FlightSummary = ({ className }) => {
  const classes = classNames('waFlightSummary', className);

  return (
    <div className={classes}>
      <h3>Summary</h3>
    </div>
  );
};
