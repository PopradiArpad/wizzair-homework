import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import momentPropTypes from 'react-moment-proptypes';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export class ReturnFlightSelector extends Component {
  constructor() {
    super();
    this.state = { returnDate: null, focused: false };
  }

  showDayPicker = () => {
    this.setState({ showDayPicker: true });
  };

  isDayBlocked = day => {
    const props = this.props;
    const today = moment();

    return (
      day.isSameOrBefore(today, 'day') ||
      day.isSameOrBefore(props.departureDate, 'day')
    );
  };

  render() {
    const { className, onReturnDateSelected } = this.props;
    const classes = classNames('waReturnFlightSelector', className);

    return (
      <div className={classes}>
        <div className="waReturnFlightSelector__add_return_flight">
          <SingleDatePicker
            date={this.state.returnDate}
            onDateChange={returnDate => this.setState({ returnDate })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            isDayBlocked={this.isDayBlocked}
            showDefaultInputIcon={true}
            numberOfMonths={1}
          />
        </div>
        <div className="waReturnFlightSelector__show_return_flights">
          <button
            className="button"
            disabled={!this.state.returnDate}
            onClick={() => onReturnDateSelected(this.state.returnDate)}
          >
            SHOW RETURN FLIGHTS
          </button>
        </div>
      </div>
    );
  }
}

ReturnFlightSelector.propTypes = {
  className: PropTypes.string,
  departureDate: momentPropTypes.momentObj,
  onReturnDateSelected: PropTypes.func.isRequired
};
