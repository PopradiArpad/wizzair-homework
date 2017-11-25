import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import classNames from 'classnames';
import { DateLabel } from './date_label';

export const DepartureReturn = ({
  className,
  departureDate,
  onDepartureLabelClick,
  returnDate,
  onReturnLabelClick,
  // focusedInput,
  ...rest
}) => {
  const classes = classNames('waDepartureReturn', className);

  return (
    <div className={classes} {...rest}>
      <DateLabel
        date={departureDate}
        label="Departure"
        onClick={onDepartureLabelClick}
      />
      <DateLabel
        date={returnDate}
        label="Return"
        onClick={onReturnLabelClick}
      />
    </div>
  );
};

DepartureReturn.propTypes = {
  className: PropTypes.string,
  departureDate: momentPropTypes.momentObj,
  returnDate: momentPropTypes.momentObj, //null means OneWay
  onDepartureLabelClick: PropTypes.func.isRequired,
  onReturnLabelClick: PropTypes.func.isRequired
  // focusedInput: PropTypes.oneOf([DEPARTURE_DATE, RETURN_DATE])
};
