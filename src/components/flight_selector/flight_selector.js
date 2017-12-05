import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flight } from '../flight';

export const FlightSelector = ({
  className,
  flights,
  selectedFlight,
  onFlightSelected
}) => {
  const classes = classNames('waFlightSelector', className);
  let key = 0;

  return (
    <div className={classes}>
      {title(flights)}
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
  onFlightSelected: PropTypes.func.isRequired
};

function title(flights) {
  const flight = flights[0];

  if (!flight) {
    return null;
  }

  return (
    <h3 className="waFlightSelector__title">
      {flight.departureAirport.airportText()}&rarr;{flight.arrivalAirport.airportText()}
    </h3>
  );
}

function serviceTitle(text) {
  return (
    <div className="column">
      <h5 className="waFlightSelector__service-title">{text}</h5>
    </div>
  );
}
