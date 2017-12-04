import React from 'react';
import classNames from 'classnames';

export const FlightSelector = ({ className }) => {
  const classes = classNames('waFlightSelector', className);

  return (
    <div className={classes}>
      <h3>Flights</h3>
      <h5>{'params.originIata'}</h5>
      <h5>{'params.destinationIata'}</h5>
      <h5>{'params.departureDate'}</h5>
      <h5>{'params.returnDate'}</h5>
    </div>
  );
};
