import React, { Component } from 'react';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class MyDayPickerRangeControllerWrapper extends Component {
  constructor(props) {
    super(props);

    let focusedInput = 'startDate';//null;

    this.state = {
      focusedInput,
      startDate: null,
      endDate: null,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <div>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={this.onFocusChange}
          numberOfMonths={2}
        />
      </div>
    );
  }
}
