import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Flight } from '../flight';

export const FlightSelector = ({
  className,
  flights,
  selectedFlight,
  from,
  to
}) => {
  const classes = classNames('waFlightSelector', className);
  let key = 0;

  return (
    <div className={classes}>
      <h3 className="waFlightSelector__title">{`${from} -> ${to}`}</h3>
      <div className="columns">
        <div className="column" />
        {serviceTitle('BASIC')}
        {serviceTitle('WIZZ GO')}
        {serviceTitle('WIZZ PLUS')}
      </div>
      {flights.map(flight => <Flight key={key++} flight={flight} />)}
    </div>
  );
};

FlightSelector.propTypes = {
  flights: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedFlight: PropTypes.object,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

function serviceTitle(text) {
  return (
    <div className="column">
      <h5 className="waFlightSelector__service-title">{text}</h5>
    </div>
  );
}
