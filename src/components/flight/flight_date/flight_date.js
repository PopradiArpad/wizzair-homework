import React from 'react';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';

export const FlightDate = ({ className, date }) => {
  const classes = classNames('waFlightDate', className);

  return (
    <div className={classes}>
      <p className='waFlightDate__date'>{date.format('ddd, DD MMM YYYY')} <time>{date.format('HH:MM')}</time></p>
    </div>
  );
};

FlightDate.propTypes = {
  date: momentPropTypes.momentObj.isRequired
};
