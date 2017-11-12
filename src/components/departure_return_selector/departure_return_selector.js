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

//react-dates constants
const START_DATE = 'startDate';
const END_DATE = 'endDate';

export class DepartureReturnSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDateRangeSelector: false,
      focusedInput: START_DATE
    };
  }

  onDepartureLabelClick = () => {
    console.log('onDepartureLabelClick');
    this.setState({ showDateRangeSelector: true, focusedInput: START_DATE });
  };

  onReturnLabelClick = () => {
    console.log('onReturnLabelClick');
    this.setState({ showDateRangeSelector: true, focusedInput: END_DATE });
  };

  onDatesChange = ({ startDate, endDate }) => {
    console.log('onDatesChange');
    this.props.onDatesChange(startDate, endDate);
  };

  onFocusChange = focusedInput => {
    //react-dates focuses itself to the next state automatically:
    // after START_DATE it focuses to END_DATE
    // after END_DATE it focuses to null
    //null means nothing to select and nothing is selectable
    //Our state machine is this
    // after START_DATE it focuses to END_DATE and it stays in END_DATE
    this.setState({
      focusedInput:this.state.focusedInput === END_DATE ? END_DATE : focusedInput
    });
  };

  onCloseDateRangeSelector = () => {
    this.setState({ showDateRangeSelector: false });
  };

  onOneWaySelected = () => {
    this.onDatesChange({ startDate: this.props.departureDate });
  };

  isDayBlocked = day => {
    function isBeforeToday(day){
      const now = moment();
      return day < now.day(-1);
    }

    if (this.state.focusedInput === START_DATE) {
      return isBeforeToday(day);
    }

    return day < this.props.departureDate || isBeforeToday(day);
  }

  render() {
    const classes = classNames(
      'waDepartureReturnSelector',
      this.props.className
    );
    const props = this.props;
    const state = this.state;

    return (
      <div className={classes}>
        <div className="column is-one-quarter">
          <div className="waDepartureReturnSelector__date_labels">
            <DateLabel
              date={props.departureDate}
              label="Departure"
              onClick={this.onDepartureLabelClick}
            />
            <DateLabel
              date={props.returnDate}
              label="Return"
              onClick={this.onReturnLabelClick}
            />
          </div>
        </div>
        {state.showDateRangeSelector && (
          <div className="waDepartureReturnSelector__date_range_selector">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">
                  Select{' '}
                  {state.focusedInput === START_DATE
                    ? 'departure'
                    : 'return'}{' '}
                  date
                </p>
              </header>
              <div className="card-content">
                <DayPickerRangeController
                  startDate={props.departureDate}
                  endDate={props.returnDate}
                  onDatesChange={this.onDatesChange}
                  focusedInput={state.focusedInput}
                  onFocusChange={this.onFocusChange}
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
                  onClick={this.onCloseDateRangeSelector}
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

DepartureReturnSelector.propTypes = {
  className: PropTypes.string,
  departureDate: momentPropTypes.momentObj,
  returnDate: momentPropTypes.momentObj, //null means OneWay
  onDatesChange: PropTypes.func.isRequired,
};
