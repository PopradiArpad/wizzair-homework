import React, { Component } from 'react';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const START_DATE = 'startDate';

export default class MyDayPickerRangeControllerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: START_DATE,
      startDate: null,
      endDate: null,
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    console.log('onDatesChange ',JSON.stringify({ startDate, endDate }));
    this.setState({ startDate, endDate });
  };

  onFocusChange = focusedInput => {
    console.log('onFocusChange focusedInput:',focusedInput);
    this.setState({
      // Force the focusedInput to always be truthy so that dates are always selectable
      focusedInput: !focusedInput ? START_DATE : focusedInput,
    });
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    console.log('render');
    console.log('  ',JSON.stringify({ focusedInput, startDate, endDate }));
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
