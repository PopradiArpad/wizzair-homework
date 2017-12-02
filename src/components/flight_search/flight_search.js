import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
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
  CLOSE_AIRPORT_SELECTOR
} from '../../actions';

const FlightSearchI = ({
  className,
  departureDate,
  onDepartureLabelClick,
  returnDate,
  onReturnLabelClick,
  originAirport,
  onOriginAirportClick,
  destinationAirport,
  onDestinationAirportClick,
  airportsToSelect,
  onAirportSelected,
  onCloseAirportSelector,
  focusedInput,
  searchEnabled,
  onDatesChange,
  onCloseDateRangeSelector,
  showDateRangeSelector,
  ...rest
}) => {
  const classes = classNames('waFlightSearch', className);

  return (
    <div className={classes} {...rest}>
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
            <button disabled={!searchEnabled} className="button is-primary is-large">Search</button>
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
};

const mapStateToProps = state => {
  return {
    departureDate: state.departureDate,
    returnDate: state.returnDate,
    showDateRangeSelector: state.showDateRangeSelector,
    originAirport: state.originAirport,
    destinationAirport: state.destinationAirport,
    airportsToSelect: state.airportsToSelect,
    focusedInput: state.focusedInput,
    searchEnabled: state.searchEnabled
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

    onAirportSelected: (airport) => {
      dispatch({
        type: AIRPORT_SELECTED,
        airport
      });
    },

    onCloseAirportSelector: () => {
      dispatch({ type: CLOSE_AIRPORT_SELECTOR });
    }
  };
};

export const FlightSearch = connect(mapStateToProps, mapDispatchToProps)(
  FlightSearchI
);
