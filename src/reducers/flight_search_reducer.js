import moment from 'moment';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';
import Airport from '../types/airport';
import { DEPARTURE_DATE, RETURN_DATE } from '../constants';
import {
  SELECT_DEPARTURE_DATE,
  SELECT_RETURN_DATE,
  CLOSE_DATE_RANGE_SELECTOR,
  CHANGE_DATE
} from '../actions';

const defaultState = {
  //data
  departureDate: moment(),
  returnDate: null, //null means OneWay
  originAirport: new Airport('Budapest', 'BUD'),//null,
  destinationAirport: new Airport('Debrecen', 'DEB'),//null,
  //view
  showDateRangeSelector: false,
  focusedInput: null // one of null, DEPARTURE_DATE, RETURN_DATE
};

export function flightSearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_DEPARTURE_DATE:
      return selectDate(state, DEPARTURE_DATE);
    case SELECT_RETURN_DATE:
      return selectDate(state, RETURN_DATE);
    case CLOSE_DATE_RANGE_SELECTOR:
      return closeDateRangeSelector(state);
    case CHANGE_DATE:
      return changeDate(state, action.departureDate, action.returnDate);
    default:
      return state;
  }
}

function selectDate(state, focusedInput) {
  var newState = cloneDeep(state);
  return merge(newState, {
    showDateRangeSelector: true,
    focusedInput
  });
}

function closeDateRangeSelector(state) {
  var newState = cloneDeep(state);
  return merge(newState, {
    showDateRangeSelector: false
  });
}

function changeDate(state, departureDate, returnDate) {
  //Our state machine is this
  // after START_DATE it focuses to END_DATE and it stays in END_DATE
  const focusedInput = RETURN_DATE;

  var newState = cloneDeep(state);
  return merge(newState, {
    departureDate,
    returnDate,
    focusedInput
  });
}
