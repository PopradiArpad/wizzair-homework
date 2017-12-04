import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RESET_FLIGHT_SELECT } from '../../actions';
import { TravelIata } from '../../types/travel';
import { FlightSummary } from '../flight_summary';
import { FlightSelector } from '../flight_selector';
import { ReturnFlightSelector } from '../return_flight_selector';

class FlightSelectI extends Component {
  componentWillMount() {
    const params = this.props.match.params;
    this.props.onWillMount(
      new TravelIata(
        params.originIata,
        params.destinationIata,
        params.departureDate,
        params.returnDate
      )
    );
  }

  render() {
    const {
      className,
      toFlights,
      backFlights,
      selectedToFlight,
      selectedBackFlight,
      match: { params: { returnDate } }
    } = this.props;

    const classes = classNames('waFlightSelect', className);
    const showBackFlights = returnDate!=='null';

    return (
      <div className={classes}>
        <h1 className="title">Select Flights</h1>
        <div className="columns">
          <div className="column is-one-third">
            <FlightSummary />
          </div>
          <div className="column">
            <FlightSelector
              flights={toFlights}
              selectedFlight={selectedToFlight}
            />
            {showBackFlights && (
              <FlightSelector
                flights={backFlights}
                selectedFlight={selectedBackFlight}
              />
            )}
            {!showBackFlights && <ReturnFlightSelector />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ flightSelect }) => {
  return {
    toFlights: flightSelect.toFlights,
    backFlights: flightSelect.backFlights,
    selectedToFlight: flightSelect.selectedToFlight,
    selectedBackFlight: flightSelect.selectedBackFlight
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onWillMount: travel => {
      dispatch({
        type: RESET_FLIGHT_SELECT,
        travel
      });
    }
  };
};

export const FlightSelect = connect(mapStateToProps, mapDispatchToProps)(
  FlightSelectI
);
