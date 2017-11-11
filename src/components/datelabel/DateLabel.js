import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';
import './_datelabel.scss';

const DateLabel = ({
  className,
  children,
  date,
  text,
  ...rest
}) => {
  const classes = classNames('fuiDateLabel', className);
  const textElement = text ? (<div className="fuiDateLabel__text">{text}</div>) : null;
  const dateElement = date ? (<div className="is-size-6">{date.format("D MMM YYYY")}</div>) : null;

  return (
    <label
      className={classes}
      {...rest}
    >
      {textElement}
      {dateElement}
    </label>
  );
};

DateLabel.propTypes = {
  className: PropTypes.string,
  date: momentPropTypes.momentObj,
  text: PropTypes.string,
};

export default DateLabel;
