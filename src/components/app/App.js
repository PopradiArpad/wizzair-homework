import React, { Component } from 'react';
// import DateRangePickerWrapper from './DateRangePickerWrapper';
import MyDayPickerRangeControllerWrapper from '../MyDayPickerRangeControllerWrapper';
import DateLabel from '../datelabel/DateLabel';
import moment from 'moment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <DateLabel date={moment()} text='Departure'/>
        <DateLabel date={moment()} text='Return'/>
        <MyDayPickerRangeControllerWrapper/>
      </div>
    );
  }
}

export default App;
