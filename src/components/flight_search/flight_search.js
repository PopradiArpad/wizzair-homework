import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { DepartureReturn } from '../departure_return';
import { OriginDestination } from '../origin_destination';
import { DateRangeSelector } from '../date_range_selector';
import { AirportSelector } from '../airport_selector';
import {
  SELECT_DEPARTURE_DATE,
  SELECT_RETURN_DATE,
  CLOSE_DATE_RANGE_SELECTOR,
  CHANGE_DATE,
  SELECT_ORIGIN_AIRPORT,
  SELECT_DESTINATION_AIRPORT,
  AIRPORT_SELECTED,
  CLOSE_AIRPORT_SELECTOR,
  FETCH_STATIONS
} from '../../actions';

class FlightSearchI extends Component {
  componentWillMount() {
    this.props.onWillMount();
  }

  render() {
    const {
      className,
      travel: { originAirport, destinationAirport, departureDate, returnDate },
      onOriginAirportClick,
      onDestinationAirportClick,
      onDepartureLabelClick,
      onReturnLabelClick,
      airportsToSelect,
      onAirportSelected,
      onCloseAirportSelector,
      focusedInput,
      searchEnabled,
      onDatesChange,
      onCloseDateRangeSelector,
      showDateRangeSelector
    } = this.props;
    const classes = classNames('waFlightSearch', className);
    const searchLinkPath = getSearchLinkPath(
      originAirport,
      destinationAirport,
      departureDate,
      returnDate
    );

    return (
      <div className={classes}>
        <h1 className="title">Flights</h1>
        <div className="columns">
          <div className="column is-one-third">
            <OriginDestination
              originAirport={originAirport}
              onOriginAirportClick={onOriginAirportClick}
              destinationAirport={destinationAirport}
              onDestinationAirportClick={onDestinationAirportClick}
              focusedInput={focusedInput}
            />
            <DepartureReturn
              departureDate={departureDate}
              onDepartureLabelClick={onDepartureLabelClick}
              returnDate={returnDate}
              onReturnLabelClick={onReturnLabelClick}
              focusedInput={focusedInput}
            />
            <div>
              <Link
                className="button is-primary is-large"
                to={searchLinkPath}
                disabled={!searchEnabled}
              >
                Search
              </Link>
            </div>
          </div>
          <div className="column">
            {showDateRangeSelector && (
              <DateRangeSelector
                departureDate={departureDate}
                returnDate={returnDate}
                focusedInput={focusedInput}
                onDatesChange={onDatesChange}
                onCloseDateRangeSelector={onCloseDateRangeSelector}
              />
            )}
            {airportsToSelect && (
              <AirportSelector
                airports={airportsToSelect}
                onAirportSelected={onAirportSelected}
                onCloseAirportSelector={onCloseAirportSelector}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
function getSearchLinkPath(
  originAirport,
  destinationAirport,
  departureDate,
  returnDate
) {
  return `/select-flight/${getIataOrNull(originAirport)}/${getIataOrNull(
    destinationAirport
  )}/${getYYYY_MM_DDOrNull(departureDate)}/${getYYYY_MM_DDOrNull(returnDate)}`;
}

function getIataOrNull(airport) {
  return !!airport && airport.iata ? airport.iata : 'null';
}

function getYYYY_MM_DDOrNull(date) {
  return !!date && date.format ? date.format('YYYY-MM-DD') : 'null';
}

const mapStateToProps = ({ flightSearch }) => {
  return {
    travel: flightSearch.travel,
    showDateRangeSelector: flightSearch.showDateRangeSelector,
    airportsToSelect: flightSearch.airportsToSelect,
    focusedInput: flightSearch.focusedInput,
    searchEnabled: flightSearch.searchEnabled
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDepartureLabelClick: () => {
      dispatch({ type: SELECT_DEPARTURE_DATE });
    },

    onReturnLabelClick: () => {
      dispatch({ type: SELECT_RETURN_DATE });
    },

    onDatesChange: ({ startDate, endDate }) => {
      dispatch({
        type: CHANGE_DATE,
        departureDate: startDate,
        returnDate: endDate
      });
    },

    onCloseDateRangeSelector: () => {
      dispatch({ type: CLOSE_DATE_RANGE_SELECTOR });
    },

    onOriginAirportClick: () => {
      dispatch({ type: SELECT_ORIGIN_AIRPORT });
    },

    onDestinationAirportClick: () => {
      dispatch({ type: SELECT_DESTINATION_AIRPORT });
    },

    onAirportSelected: airport => {
      dispatch({
        type: AIRPORT_SELECTED,
        airport
      });
    },

    onCloseAirportSelector: () => {
      dispatch({ type: CLOSE_AIRPORT_SELECTOR });
    },

    onWillMount: () => {
      dispatch({ type: FETCH_STATIONS });
    }
  };
};

export const FlightSearch = connect(mapStateToProps, mapDispatchToProps)(
  FlightSearchI
);
