import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';

export const DateLabel = ({
  className,
  date,
  label,
  active,
  onClick,
  ...rest
}) => {
  const classes = classNames(
    'waDateLabel',
    { 'waDateLabel--active': active },
    className
  );
  const labelElement = <div className="waDateLabel__label">{label}</div>;
  const dateText = date ? date.format('D MMM YYYY') : 'One way';
  const dateElement = <div className="waDateLabel__date">{dateText}</div>;

  return (
    <label className={classes} onClick={onClick} {...rest}>
      {labelElement}
      {dateElement}
    </label>
  );
};

DateLabel.propTypes = {
  className: PropTypes.string,
  date: momentPropTypes.momentObj, //null means OneWay
  label: PropTypes.string,
  onClick: PropTypes.func
};
