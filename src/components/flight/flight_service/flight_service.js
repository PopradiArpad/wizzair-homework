import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const FlightService = ({ className, flightService }) => {
  const classes = classNames('waFlightService', className);

  return (
    <div className={classes}>
      <h4>FlightService</h4>
      <p>{flightService.service}</p>
      <p>{flightService.remainingtickets}</p>
      <p>{flightService.price}</p>
    </div>
  );
};

FlightService.propTypes = {
  flightService: PropTypes.object.isRequired
};
