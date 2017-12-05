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
      {flight(selectedToFlight)}
      {flight(selectedBackFlight)}
      {summary(selectedToFlight, selectedBackFlight)}
    </div>
  );
};

function summary(...selectedFlights) {
  const flights = selectedFlights.filter(e => e !== null);

  if (flights.length === 0) {
    return <div className="waFlightSummary__sum">{'Choose a flight!'}</div>;
  }

  const sum = flights.reduce(
    (sum, selectedFlight) => sum + selectedFlight.getPriceAsNumber(),
    0
  );
  const currency = selectedFlights[0] ? selectedFlights[0].getCurrency() : '';

  return (
    <div className="level is-mobile waFlightSummary__sum">
      <div className="level-item has-text-centered">Flights</div>
      <div className="level-item has-text-centered">
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
  const departureTime = flight.departureTime;
  const arrivalTime = flight.arrivalTime;

  return (
    <div className="waFlightSummary__flight">
      <div className="waFlightSummary__airports">
        {flight.departureAirport.airportText()} -{' '}
        {flight.arrivalAirport.airportText()}
      </div>
      {departureTime.isSame(arrivalTime, 'day')
        ? sameDay(departureTime, arrivalTime)
        : differentDay(departureTime, arrivalTime)}
      <div className="level is-mobile">
        <div className="level-item has-text-centered">
          {selectedFlight.service}
        </div>
        <div className="level-item has-text-centered">
          {selectedFlight.getSelectedService().price}
        </div>
      </div>
    </div>
  );
}

function day(date) {
  return date.format('ddd, DD MMM YYYY');
}

function time(date) {
  return date.format('HH:MM');
}

function sameDay(departureDate, arrivalDate) {
  return (
    <p className="waFlightSummary__date">
      {day(departureDate)}
      <br />
      <time>{time(departureDate)}</time> &rarr; <time>{time(arrivalDate)}</time>
    </p>
  );
}

function differentDay(departureDate, arrivalDate) {
  return (
    <p className="waFlightSummary__date">
      {day(departureDate)} <time>{time(departureDate)}</time>
      <br />
      &rarr;<br />
      {day(arrivalDate)} <time>{time(arrivalDate)}</time>
    </p>
  );
}

FlightSummary.propTypes = {
  selectedToFlight: PropTypes.object,
  selectedBackFlight: PropTypes.object
};
