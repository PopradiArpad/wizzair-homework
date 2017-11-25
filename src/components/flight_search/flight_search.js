import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { DepartureReturn } from '../departure_return';
import { DateRangeSelector } from '../date_range_selector';
import {
  SELECT_DEPARTURE_DATE,
  SELECT_RETURN_DATE,
  CLOSE_DATE_RANGE_SELECTOR,
  CHANGE_DATE
} from '../../actions';

const FlightSearchI = ({
  className,
  departureDate,
  onDepartureLabelClick,
  returnDate,
  onReturnLabelClick,
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
        <div className="column">
          <DepartureReturn
            departureDate={departureDate}
            onDepartureLabelClick={onDepartureLabelClick}
            returnDate={returnDate}
            onReturnLabelClick={onReturnLabelClick}
          />
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
      <button className="button is-primary is-large">Search</button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    departureDate: state.departureDate,
    returnDate: state.returnDate,
    showDateRangeSelector: state.showDateRangeSelector,
    focusedInput: state.focusedInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDepartureLabelClick: () => {
      // console.log('onDepartureLabelClick');
      dispatch({ type: SELECT_DEPARTURE_DATE });
    },

    onReturnLabelClick: () => {
      // console.log('onReturnLabelClick');
      dispatch({ type: SELECT_RETURN_DATE });
    },

    onDatesChange: ({ startDate, endDate }) => {
      console.log('onDatesChange');
      dispatch({
        type: CHANGE_DATE,
        departureDate: startDate,
        returnDate: endDate
      });
    },

    onCloseDateRangeSelector: () => {
      dispatch({ type: CLOSE_DATE_RANGE_SELECTOR });
    }
  };
};

export const FlightSearch = connect(mapStateToProps, mapDispatchToProps)(
  FlightSearchI
);
