import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const FlightService = ({ className, flightService }) => {
  const classes = classNames('waFlightService', className);

  if (flightService.remainingtickets === 0) {
    return null;
  }

  return (
    <div className={classes}>
      <div className="waFlightService__price">{flightService.price}</div>
    </div>
  );
};

FlightService.propTypes = {
  flightService: PropTypes.object.isRequired
};
