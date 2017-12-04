import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flight } from '../flight';

export const FlightSelector = ({
  className,
  flights,
  selectedFlight,
  from,
  to,
  onFlightSelected
}) => {
  const classes = classNames('waFlightSelector', className);
  let key = 0;

  return (
    <div className={classes}>
      <h3 className="waFlightSelector__title">
        {from}&rarr;{to}
      </h3>
      <div className="columns is-mobile">
        <div className="column" />
        {serviceTitle('BASIC')}
        {serviceTitle('WIZZ GO')}
        {serviceTitle('WIZZ PLUS')}
      </div>
      {flights.map(flight => (
        <Flight
          key={key++}
          flight={flight}
          onFlightSelected={onFlightSelected}
          selectedService={
            selectedFlight && selectedFlight.flight.isEqual(flight)
              ? selectedFlight.service
              : null
          }
        />
      ))}
    </div>
  );
};

FlightSelector.propTypes = {
  flights: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFlight: PropTypes.object,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  onFlightSelected: PropTypes.func.isRequired
};

function serviceTitle(text) {
  return (
    <div className="column">
      <h5 className="waFlightSelector__service-title">{text}</h5>
    </div>
  );
}
