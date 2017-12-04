import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const FlightService = ({
  className,
  flightService,
  onFlightSelected,
  selected
}) => {
  const classes = classNames('waFlightService', className, {'waFlightService--selected':selected});

  if (flightService.remainingtickets === 0) {
    return null;
  }

  return (
    <div className={classes} onClick={onFlightSelected}>
      <div className="waFlightService__price">{flightService.price}</div>
    </div>
  );
};

FlightService.propTypes = {
  flightService: PropTypes.object.isRequired,
  onFlightSelected: PropTypes.func.isRequired,
  selected: PropTypes.bool
};
