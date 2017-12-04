import React from 'react';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';

export const FlightDate = ({ className, date }) => {
  const classes = classNames('waFlightDate', className);

  return (
    <div className={classes}>
      <h4>FlightDate</h4>
      <p>{date.format('ddd,DD MMM YYYY')}</p>
    </div>
  );
};

FlightDate.propTypes = {
  date: momentPropTypes.momentObj.isRequired
};
