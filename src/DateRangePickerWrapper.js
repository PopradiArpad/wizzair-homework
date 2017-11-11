import React, { Component } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class DateRangePickerWrapper extends Component {
  constructor(props) {
    super(props);

    let focusedInput = null;

    this.state = {
      focusedInput,
      startDate: null,
      endDate: null,
      oneWayOnly: false
    };
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  onOneWayOnly = () => {
    this.setState({ oneWayOnly:true });
    console.log("onOneWayOnly",this);
    this.dateRangePicker.onOutsideClick();
  };

  render() {
    const { focusedInput, startDate, endDate, oneWayOnly } = this.state;

    return (
      <div>
        <DateRangePicker ref={(element) => {this.dateRangePicker = element;console.log("this.dateRangePicker set!",this);}}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          endDateId={'endDateId'}
          startDatePlaceholderText={'Departure'}
          endDatePlaceholderText={oneWayOnly ? 'One way' : 'Return'}
          renderCalendarInfo={this.renderCalendarInfo}
        />
      </div>
    );
  }

  renderCalendarInfo = () => {
    return <button onClick={this.onOneWayOnly}>ONE WAY ONLY</button>;
  }
}
