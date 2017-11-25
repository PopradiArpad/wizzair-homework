import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AirportLabel } from './airport_label';
import Airport from '../../types/airport';

export const OriginDestination = ({
  className,
  originAirport,
  onOriginAirportClick,
  destinationAirport,
  onDestinationAirportClick,
  // focusedInput,
  ...rest
}) => {
  const classes = classNames('waOriginDestination', className);

  return (
    <div className={classes} {...rest}>
      <AirportLabel
        airport={originAirport}
        label="Origin"
        onClick={onOriginAirportClick}
      />
      <AirportLabel
        airport={destinationAirport}
        label="Destination"
        onClick={onDestinationAirportClick}
      />
    </div>
  );
};

OriginDestination.propTypes = {
  className: PropTypes.string,
  originAirport: Airport.PropType,
  destinationAirport: Airport.PropType,
  onOriginAirportClick: PropTypes.func.isRequired,
  onDestinationAirportClick: PropTypes.func.isRequired
  // focusedInput: PropTypes.oneOf([DEPARTURE_DATE, RETURN_DATE])
};
