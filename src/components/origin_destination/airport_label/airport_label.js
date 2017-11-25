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
  let shortNameElement = null;
  let iataElement = null;
  if (airport) {
    shortNameElement = <div className="waAirportLabel__shortName">{airport.shortName}</div>;
    iataElement = <div className="waAirportLabel__iata">{airport.iata}</div>;
  }

  return (
    <label className={classes} onClick={onClick} {...rest}>
      {labelElement}
      {shortNameElement}
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
