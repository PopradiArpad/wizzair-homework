import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import classNames from 'classnames';
import { DateRangeSelector } from './date_range_selector';
import { DateLabel } from './date_label';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import { DEPARTURE_DATE, RETURN_DATE } from '../../constants';

const DepartureReturnSelectorI = ({
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
  console.log('DepartureReturnSelectorI render');
  const classes = classNames('waDepartureReturnSelector', className);

  return (
    <div className={classes} {...rest}>
      <div className="column is-one-quarter">
        <div className="waDepartureReturnSelector__date_labels">
          <DateLabel
            date={departureDate}
            label="Departure"
            onClick={onDepartureLabelClick}
          />
          <DateLabel
            date={returnDate}
            label="Return"
            onClick={onReturnLabelClick}
          />
        </div>
      </div>
      {showDateRangeSelector &&
        <DateRangeSelector
          departureDate={departureDate}
          returnDate={returnDate}
          focusedInput={focusedInput}
          onDatesChange={onDatesChange}
          onCloseDateRangeSelector={onCloseDateRangeSelector}
        />
      }
    </div>
  );
};

DepartureReturnSelectorI.propTypes = {
  className: PropTypes.string,
  departureDate: momentPropTypes.momentObj,
  returnDate: momentPropTypes.momentObj, //null means OneWay
  showDateRangeSelector: PropTypes.bool,
  focusedInput: PropTypes.oneOf([DEPARTURE_DATE, RETURN_DATE])
};

const mapStateToProps = state => {
  console.log('mapStateToProps state', state);
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
      console.log('onDepartureLabelClick');
      dispatch({ type: 'SELECT_DEPARTURE_DATE' });
    },

    onReturnLabelClick: () => {
      console.log('onReturnLabelClick');
      dispatch({ type: 'SELECT_RETURN_DATE' });
    },

    onDatesChange: ({ startDate, endDate }) => {
      console.log('onDatesChange');
      dispatch({
        type: 'CHANGE_DATE',
        departureDate: startDate,
        returnDate: endDate
      });
    },

    onCloseDateRangeSelector: () => {
      dispatch({ type: 'CLOSE_DATE_RANGE_SELECTOR' });
    }
  };
};

export const DepartureReturnSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartureReturnSelectorI);
