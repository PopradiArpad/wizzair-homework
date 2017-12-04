import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flight } from '../flight';

export const FlightSelector = ({ className, flights, selectedFlight }) => {
  const classes = classNames('waFlightSelector', className);
  let key=0;

  return (
    <div className={classes}>
      <h3>Flights</h3>
      {flights.map(flight => <Flight key={key++} flight={flight} />)}
    </div>
  );
};

FlightSelector.propTypes = {
  flights: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFlight: PropTypes.object
};
