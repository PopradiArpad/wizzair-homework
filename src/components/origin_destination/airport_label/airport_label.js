import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Airport from '../../../types/airport';

export const AirportLabel = ({
  className,
  airport,
  label,
  active,
  onClick,
  ...rest
}) => {
  const classes = classNames('waAirportLabel', className);
  const labelElement = <div className="waAirportLabel__label">{label}</div>;
  let cityElement = null;
  let iataElement = null;
  if (airport) {
    cityElement = <div className="waAirportLabel__city">{airport.city}</div>;
    iataElement = <div className="waAirportLabel__iata">{airport.iata}</div>;
  }

  return (
    <label className={classes} onClick={onClick} {...rest}>
      {labelElement}
      {cityElement}
      {iataElement}
    </label>
  );
};

AirportLabel.propTypes = {
  className: PropTypes.string,
  airport: Airport.PropType,
  label: PropTypes.string,
  onClick: PropTypes.func
};
