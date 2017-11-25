import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Airport from '../../types/airport';
import { AirportLabel } from '../airport_label';

export const AirportSelector = ({
  className,
  airports,
  onAirportSelected,
  onCloseAirportSelector,
  ...rest
}) => {
  const classes = classNames('waAirportSelector', className);

  return (
    <div className={classes} {...rest}>
      <ul className='waAirportSelector__airports'>
        {airports.map(airport => (
          <li key={airport.iata}>
            <AirportLabel
              airport={airport}
              onClick={() => onAirportSelected(airport)}
              className='waAirportSelector__airport'
            />
          </li>
        ))}
      </ul>
      <div>
        <button
          className="button is-primary is-large"
          onClick={onCloseAirportSelector}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

AirportSelector.propTypes = {
  className: PropTypes.string,
  airports: Airport.ArrayPropType,
  onAirportSelected: PropTypes.func.isRequired,
  onCloseAirportSelector: PropTypes.func.isRequired
};
