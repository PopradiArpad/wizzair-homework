import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AirportLabel } from '../airport_label';
import Airport from '../../types/airport';
import Input from '../../types/input';

export const OriginDestination = ({
  className,
  originAirport,
  onOriginAirportClick,
  destinationAirport,
  onDestinationAirportClick,
  focusedInput,
  ...rest
}) => {
  const classes = classNames('waOriginDestination', className);

  return (
    <div className={classes} {...rest}>
      <AirportLabel
        airport={originAirport}
        label="Origin"
        onClick={onOriginAirportClick}
        active={focusedInput === Input.ORIGIN_AIRPORT}
      />
      <AirportLabel
        airport={destinationAirport}
        label="Destination"
        onClick={onDestinationAirportClick}
        active={focusedInput === Input.DESTINATION_AIRPORT}
      />
    </div>
  );
};

OriginDestination.propTypes = {
  className: PropTypes.string,
  originAirport: Airport.PropType,
  destinationAirport: Airport.PropType,
  onOriginAirportClick: PropTypes.func.isRequired,
  onDestinationAirportClick: PropTypes.func.isRequired,
  focusedInput: PropTypes.string
};
