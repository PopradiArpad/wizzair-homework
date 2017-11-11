import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';

export const DateLabel = ({
  className,
  date,
  label,
  onClick,
  ...rest
}) => {
  const classes = classNames('fuiDateLabel', className);
  const labelElement = <div className="fuiDateLabel__label">{label}</div>;
  const dateText = date ? date.format("D MMM YYYY") : "";
  const dateElement = <div className="fuiDateLabel__date">{dateText}</div>;

  return (
    <label
      className={classes}
      onClick={onClick}
      {...rest}
    >
      {labelElement}
      {dateElement}
    </label>
  );
};

DateLabel.propTypes = {
  className: PropTypes.string,
  date: momentPropTypes.momentObj,
  label: PropTypes.string,
  onClick: PropTypes.func,
};
