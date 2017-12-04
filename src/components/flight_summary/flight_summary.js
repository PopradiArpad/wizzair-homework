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

FlightSummary.propTypes = {
  selectedToFlight: PropTypes.object,
  selectedBackFlight: PropTypes.object
};
