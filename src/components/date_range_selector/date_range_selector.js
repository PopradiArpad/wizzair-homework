import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import momentPropTypes from 'react-moment-proptypes';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Input from '../../types/input';
import moment from 'moment';

//This is a stateless component with some methods.
export class DateRangeSelector extends Component {
  onOneWaySelected = () => {
    const props = this.props;

    props.onDatesChange({ startDate: props.departureDate, endDate: null });
  };

  isDayBlocked = day => {
    const props = this.props;

    if (props.focusedInput === Input.DEPARTURE_DATE) {
      return isBeforeToday(day);
    }

    return day < props.departureDate || isBeforeToday(day);
  };

  render() {
    const classes = classNames('waDateRangSelector', this.props.className);

    const props = this.props;

    return (
      <div className={classes}>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">
              Select{' '}
              {props.focusedInput === Input.DEPARTURE_DATE
                ? 'departure'
                : 'return'}{' '}
              date
            </p>
          </header>
          <div className="card-content">
            <DayPickerRangeController
              startDate={props.departureDate}
              endDate={props.returnDate}
              focusedInput={props.focusedInput}
              onDatesChange={props.onDatesChange}
              numberOfMonths={2}
              isDayBlocked={this.isDayBlocked}
            />
          </div>
          <footer className="card-footer">
            <a className="card-footer-item" onClick={this.onOneWaySelected}>
              ONE WAY ONLY
            </a>
            <a
              className="card-footer-item button is-primary is-large"
              onClick={props.onCloseDateRangeSelector}
            >
              OK
            </a>
          </footer>
        </div>
      </div>
    );
  }
}

DateRangeSelector.propTypes = {
  className: PropTypes.string,
  departureDate: momentPropTypes.momentObj,
  returnDate: momentPropTypes.momentObj,
  focusedInput: PropTypes.oneOf([Input.DEPARTURE_DATE, Input.RETURN_DATE]),
  onDatesChange: PropTypes.func.isRequired,
  onCloseDateRangeSelector: PropTypes.func.isRequired
};

function isBeforeToday(day) {
  const now = moment();
  return now.diff(day, 'days') > 0;
  //Probably this is better:
  // if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  //
  // const aYear = a.year();
  // const aMonth = a.month();
  //
  // const bYear = b.year();
  // const bMonth = b.month();
  //
  // const isSameYear = aYear === bYear;
  // const isSameMonth = aMonth === bMonth;
  //
  // if (isSameYear && isSameMonth) return a.date() < b.date();
  // if (isSameYear) return aMonth < bMonth;
  // return aYear < bYear;
}
