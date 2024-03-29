import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FlightSearch } from '../flight_search';
import { FlightSelect } from '../flight_select';

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="waApp">
          <div>
            <Switch>
              <Route exact path="/" component={FlightSearch} />
              <Route
                path="/select-flight/:originIata/:destinationIata/:departureDate/:returnDate"
                component={FlightSelect}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
