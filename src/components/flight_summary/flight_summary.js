import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const FlightSummary = ({
  className,
  selectedToFlight,
  selectedBackFlight
}) => {
  const classes = classNames('waFlightSummary', className);

  return (
    <div className={classes}>
      {summary(selectedToFlight, selectedBackFlight)}
      {flight(selectedToFlight)}
      {flight(selectedBackFlight)}
    </div>
  );
};

function summary(...selectedFlights) {
  const sum = selectedFlights
    .filter(e => e !== null)
    .reduce(
      (sum, selectedFlight) => sum + selectedFlight.getPriceAsNumber(),
      0
    );
  const currency = selectedFlights[0] ? selectedFlights[0].getCurrency() : '';

  return (
    <div className="level">
      <div className="level-left">Flights</div>
      <div className="level-right">
        {currency}
        {sum}
      </div>
    </div>
  );
}

function flight(selectedFlight) {
  if (!selectedFlight) {
    return null;
  }

  const flight = selectedFlight.flight;

  return (
    <div>
      <div>
        {airport(flight.departureAirport)}-{airport(flight.arrivalAirport)}
      </div>
      <div>
        {day(flight.departureTime)}
      </div>
      <div>
        {time(flight.departureTime)}&rarr;{time(flight.arrivalTime)}
      </div>
      <div className="level">
        <div className="level-left">{selectedFlight.service}</div>
        <div className="level-right">
          {selectedFlight.getSelectedService().price}
        </div>
      </div>
    </div>
  );
}

function airport(airp) {
  return `${airp.shortName}(${airp.iata})`;
}

function day(date) {
  return date.format('ddd, DD MMM YYYY');
}

function time(date) {
  return date.format('HH:MM');
}

FlightSummary.propTypes = {
  selectedToFlight: PropTypes.object,
  selectedBackFlight: PropTypes.object
};
