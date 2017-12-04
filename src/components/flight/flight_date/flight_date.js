import React from 'react';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';

export const FlightDate = ({ className, departureDate, arrivalDate }) => {
  const classes = classNames('waFlightDate', className);

  return (
    <div className={classes}>
      {departureDate.isSame(arrivalDate, 'day')
        ? sameDay(departureDate, arrivalDate)
        : differentDay(departureDate, arrivalDate)}
    </div>
  );
};

function sameDay(departureDate, arrivalDate) {
  return (
    <p className="waFlightDate__date">
      {day(departureDate)}<br/>
      <time>{time(departureDate)}</time> &rarr; <time>{time(arrivalDate)}</time>
    </p>
  );
}

function differentDay(departureDate, arrivalDate) {
  return (
    <p className="waFlightDate__date">
      {day(departureDate)} <time>{time(departureDate)}</time><br/>
      &rarr;<br/>
      {day(arrivalDate)} <time>{time(arrivalDate)}</time>
    </p>
  );
}

function day(date) {
  return date.format('ddd, DD MMM YYYY');
}

function time(date) {
  return date.format('HH:MM');
}

FlightDate.propTypes = {
  departureDate: momentPropTypes.momentObj.isRequired,
  arrivalDate: momentPropTypes.momentObj.isRequired
};
