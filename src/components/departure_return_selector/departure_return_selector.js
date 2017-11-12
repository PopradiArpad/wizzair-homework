import React, { Component } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import classNames from 'classnames';
import { DateRangeSelector } from './date_range_selector';
import { DateLabel } from './date_label';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { connect } from 'react-redux';
import { DEPARTURE_DATE, RETURN_DATE } from '../../constants';

//This is a stateless component with some methods.
class DepartureReturnSelectorI extends Component {
  render() {
    console.log('DepartureReturnSelectorI render');
    const props = this.props;
    const classes = classNames('waDepartureReturnSelector', props.className);

    return (
      <div className={classes}>
        <div className="column is-one-quarter">
          <div className="waDepartureReturnSelector__date_labels">
            <DateLabel
              date={props.departureDate}
              label="Departure"
              onClick={props.onDepartureLabelClick}
            />
            <DateLabel
              date={props.returnDate}
              label="Return"
              onClick={props.onReturnLabelClick}
            />
          </div>
        </div>
        {props.showDateRangeSelector && (
          <DateRangeSelector
            departureDate={props.departureDate}
            returnDate={props.returnDate}
            focusedInput={props.focusedInput}
            onDatesChange={props.onDatesChange}
            onCloseDateRangeSelector={props.onCloseDateRangeSelector}
          />
        )}
      </div>
    );
  }
}

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
