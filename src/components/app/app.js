import React, { Component } from 'react';
import { DepartureReturnSelector } from '../departure_return_selector';

export class App extends Component {
  render() {
    return (
      <div className="waApp">
        <header className="waApp__header" />
        <DepartureReturnSelector />
      </div>
    );
  }
}
