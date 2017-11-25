import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { DepartureReturn } from '../departure_return';
import { OriginDestination } from '../origin_destination';
import { DateRangeSelector } from '../date_range_selector';
import {
  SELECT_DEPARTURE_DATE,
  SELECT_RETURN_DATE,
  CLOSE_DATE_RANGE_SELECTOR,
  CHANGE_DATE,
  SELECT_ORIGIN_AIRPORT,
  SELECT_DESTINATION_AIRPORT,
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
  focusedInput,
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
          />
          <DepartureReturn
            departureDate={departureDate}
            onDepartureLabelClick={onDepartureLabelClick}
            returnDate={returnDate}
            onReturnLabelClick={onReturnLabelClick}
          />
          <div>
            <button className="button is-primary is-large">Search</button>
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
    focusedInput: state.focusedInput
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
    }
  };
};

export const FlightSearch = connect(mapStateToProps, mapDispatchToProps)(
  FlightSearchI
);
