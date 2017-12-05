import React, { Component } from 'react';
import classNames from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import { CHANGE_DATE, RESET_FLIGHT_SELECT, SELECT_FLIGHT } from '../../actions';
import { TravelIata } from '../../types/travel';
import { FlightSummary } from '../flight_summary';
import { FlightSelector } from '../flight_selector';
import { ReturnDateSelector } from '../return_date_selector';

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

  onReturnDateSelected = returnDate => {
    const {
      onDatesChange,
      match: { params: { originIata, destinationIata, departureDate } },
      history
    } = this.props;

    onDatesChange(moment(departureDate), moment(returnDate));
    history.replace(
      `/select-flight/${originIata}/${destinationIata}/${departureDate}/${returnDate.format(
        'YYYY-MM-DD'
      )}`
    );
  };

  render() {
    const {
      className,
      toFlights,
      backFlights,
      selectedToFlight,
      selectedBackFlight,
      onFlightSelected,
      match: { params: { departureDate, returnDate } }
    } = this.props;

    const classes = classNames('waFlightSelect', className);
    const showBackFlights = returnDate !== 'null';

    return (
      <div className={classes}>
        <h1 className="waFlightSelect__title">Select Flights</h1>
        <div className="columns">
          <div className="column is-one-fifth">
            <FlightSummary
              selectedToFlight={selectedToFlight}
              selectedBackFlight={selectedBackFlight}
            />
          </div>
          <div className="column">
            <FlightSelector
              flights={toFlights}
              selectedFlight={selectedToFlight}
              onFlightSelected={onFlightSelected(true)}
            />
            {showBackFlights && (
              <FlightSelector
                flights={backFlights}
                selectedFlight={selectedBackFlight}
                onFlightSelected={onFlightSelected(false)}
              />
            )}
            {!showBackFlights && (
              <ReturnDateSelector
                departureDate={moment(departureDate)}
                onReturnDateSelected={this.onReturnDateSelected}
              />
            )}
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
    },

    onFlightSelected: isTo => (flight, service) => {
      dispatch({
        type: SELECT_FLIGHT,
        flight,
        service,
        isTo
      });
    },

    onDatesChange: (departureDate, returnDate) => {
      dispatch({
        type: CHANGE_DATE,
        departureDate,
        returnDate,
        fromReturnDateSelector: true
      });
    }
  };
};

export const FlightSelect = connect(mapStateToProps, mapDispatchToProps)(
  FlightSelectI
);
