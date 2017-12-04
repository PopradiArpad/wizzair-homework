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
      <div className="columns is-mobile">
        <div className="column">
          <FlightDate date={flight.departureTime} />
          {'->'}
          <FlightDate date={flight.returnTime} />
        </div>
        {flight.services.map(service => (
          <div className="column" key={key++}>
            <FlightService flightService={service} />
          </div>
        ))}
      </div>
    </div>
  );
};

Flight.propTypes = {
  flight: PropTypes.object.isRequired
};
