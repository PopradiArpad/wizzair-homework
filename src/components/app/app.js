import React, { Component } from 'react';
import { FlightSearch } from '../flight_search';

export class App extends Component {
  render() {
    return (
      <div className="waApp">
        <header className="waApp__header" />
        <FlightSearch />
      </div>
    );
  }
}
