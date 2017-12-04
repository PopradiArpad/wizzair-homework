import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FlightService } from './flight_service';
import { FlightDate } from './flight_date';

export const Flight = ({ className, flight }) => {
  const classes = classNames('waFlight', className);
  let key = 0;
  return (
    <div className={classes}>
      <h4>Flight</h4>
      <FlightDate date={flight.departureTime} />
      <FlightDate date={flight.returnTime} />
      <div>
        {flight.services.map(service => (
          <FlightService key={key++} flightService={service} />
        ))}
      </div>
    </div>
  );
};

Flight.propTypes = {
  flight: PropTypes.object.isRequired
};
