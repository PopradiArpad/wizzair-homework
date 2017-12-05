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
    this.state = { date: null, focused: false };
  }

  showDayPicker = () => {
    this.setState({ showDayPicker: true });
  };

  isDayBlocked = day => {
    const props = this.props;
    const today = moment();

    return day.isSameOrBefore(today,'day') || day.isSameOrBefore(props.departureDate,'day');
  };

  render() {
    const { className } = this.props;
    const classes = classNames('waReturnFlightSelector', className);

    return (
      <div className={classes}>
        <div className="waReturnFlightSelector__add_return_flight">
          <SingleDatePicker
            date={this.state.date}
            onDateChange={date => this.setState({ date })}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            isDayBlocked={this.isDayBlocked}
            showDefaultInputIcon={true}
            numberOfMonths={1}
          />
        </div>
        <div className="waReturnFlightSelector__show_return_flights">
          {'SHOW RETURN FLIGHTS'}
        </div>
      </div>
    );
  }
}

ReturnFlightSelector.propTypes = {
  className: PropTypes.string,
  departureDate: momentPropTypes.momentObj
};
