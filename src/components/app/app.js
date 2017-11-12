import React, { Component } from 'react';
import { DepartureReturnSelector } from '../departure_return_selector';
import moment from 'moment';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //data
      departureDate: moment(),
      returnDate: null, //null means OneWay
    };
  }

  onDatesChange = (departureDate, returnDate) => {
    console.log(
      'App onDatesChange',
      JSON.stringify({ departureDate, returnDate })
    );
    this.setState({ departureDate, returnDate });
  };

  render() {
    const state = this.state;

    return (
      <div className="waApp">
        <header className="waApp__header" />
        <DepartureReturnSelector
          departureDate={state.departureDate}
          returnDate={state.returnDate}
          onDatesChange={this.onDatesChange}
        />
      </div>
    );
  }
}
