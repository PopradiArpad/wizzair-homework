import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import classNames from 'classnames';
// import { DateRangeSelector } from './date_range_selector';
import { DateLabel } from './date_label';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { connect } from 'react-redux';
import {DEPARTURE_DATE, RETURN_DATE} from '../../constants';

//This is a stateless component with some methods.
class DepartureReturnSelectorI extends Component {
  onOneWaySelected = () => {
    const props = this.props;

    props.onDatesChange({ startDate: props.departureDate, endDate: null });
  };

  isDayBlocked = day => {
    const props = this.props;

    if (props.focusedInput === DEPARTURE_DATE) {
      return isBeforeToday(day);
    }

    return day < props.departureDate || isBeforeToday(day);
  };

  render() {
    console.log('render');
    const props = this.props;
    const classes = classNames(
      'waDepartureReturnSelector',
      props.className
    );

    return (
      <div className={classes}>
        <div className="column is-one-quarter">
          <div className="waDepartureReturnSelector__date_labels">
            <DateLabel
              date={props.departureDate}
              label="Departure"
              onClick={props.onDepartureLabelClick}
            />
            <DateLabel
              date={props.returnDate}
              label="Return"
              onClick={props.onReturnLabelClick}
            />
          </div>
        </div>
        {props.showDateRangeSelector && (
          <div className="waDepartureReturnSelector__date_range_selector">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Select{' '}
                  {props.focusedInput === DEPARTURE_DATE
                    ? 'departure'
                    : 'return'}{' '}
                  date
                </p>
              </header>
              <div className="card-content">
                <DayPickerRangeController
                  startDate={props.departureDate}
                  endDate={props.returnDate}
                  onDatesChange={props.onDatesChange}
                  focusedInput={props.focusedInput}
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
        )}
      </div>
    );
  }
}

DepartureReturnSelectorI.propTypes = {
  className: PropTypes.string,
  departureDate: momentPropTypes.momentObj,
  returnDate: momentPropTypes.momentObj, //null means OneWay
  showDateRangeSelector: PropTypes.bool,
  focusedInput: PropTypes.oneOf([DEPARTURE_DATE, RETURN_DATE])
};

function isBeforeToday(day) {
  const now = moment();
  return day < now.day(-1);
}

const mapStateToProps = state => {
  console.log('mapStateToProps state',state);
  return {
    departureDate: state.departureDate,
    returnDate: state.returnDate,
    showDateRangeSelector: state.showDateRangeSelector,
    focusedInput: state.focusedInput,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDepartureLabelClick: () => {
      console.log('onDepartureLabelClick');
      dispatch({ type: 'SELECT_DEPARTURE_DATE' });
    },

    onReturnLabelClick: () => {
      console.log('onReturnLabelClick');
      dispatch({ type: 'SELECT_RETURN_DATE' });
    },

    onDatesChange: ({ startDate, endDate }) => {
      console.log('onDatesChange');
      dispatch({
        type: 'CHANGE_DATE',
        departureDate: startDate,
        returnDate: endDate
      });
    },

    onCloseDateRangeSelector: () => {
      dispatch({ type: 'CLOSE_DATE_RANGE_SELECTOR' });
    }
  };
};

export const DepartureReturnSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartureReturnSelectorI);
