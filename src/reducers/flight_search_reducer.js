import moment from 'moment';
import merge from 'lodash.merge';
import cloneDeep from 'lodash.clonedeep';
import Airport from '../types/airport';
import Input from '../types/input';
import {
  SELECT_ORIGIN_AIRPORT,
  SELECT_DESTINATION_AIRPORT,
  AIRPORT_SELECTED,
  CLOSE_AIRPORT_SELECTOR,
  SELECT_DEPARTURE_DATE,
  SELECT_RETURN_DATE,
  CHANGE_DATE,
  CLOSE_DATE_RANGE_SELECTOR,
  FETCH_STATIONS_SUCCEEDED,
  FETCH_STATIONS_FAILED
} from '../actions';

const defaultState = {
  //assistant
  departureDate: moment(),
  returnDate: null, //null means OneWay
  originAirport: null,
  destinationAirport: null,
  //view
  focusedInput: null, // one of null, DEPARTURE_DATE, RETURN_DATE
  showDateRangeSelector: false,
  airportsToSelect: null,
  //api
  stations: null
};

let testAirports = null;

export function flightSearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SELECT_ORIGIN_AIRPORT:
      return selectOriginAirport(state);
    case SELECT_DESTINATION_AIRPORT:
      return selectDestinationAirport(state);
    case AIRPORT_SELECTED:
      return airportSelected(state, action.airport);
    case CLOSE_AIRPORT_SELECTOR:
      return closeAirportSelector(state);
    case SELECT_DEPARTURE_DATE:
      return selectDate(state, Input.DEPARTURE_DATE);
    case SELECT_RETURN_DATE:
      return selectDate(state, Input.RETURN_DATE);
    case CHANGE_DATE:
      return changeDate(state, action.departureDate, action.returnDate);
    case CLOSE_DATE_RANGE_SELECTOR:
      return closeDateRangeSelector(state);
    case FETCH_STATIONS_SUCCEEDED:
      return fetchStationsSucceeded(state, action.stations);
    case FETCH_STATIONS_FAILED:
      return fetchStationsFailed(state);
    default:
      return state;
  }
}

function selectOriginAirport(state) {
  var newState = cloneDeep(state);
  return merge(newState, {
    airportsToSelect: testAirports,
    focusedInput: Input.ORIGIN_AIRPORT,
    showDateRangeSelector: false
  });
}

function selectDestinationAirport(state) {
  var newState = cloneDeep(state);
  return merge(newState, {
    airportsToSelect: testAirports,
    focusedInput: Input.DESTINATION_AIRPORT,
    showDateRangeSelector: false
  });
}

function airportSelected(state, airport) {
  var newState = cloneDeep(state);
  return merge(
    newState,
    state.focusedInput === Input.ORIGIN_AIRPORT
      ? { originAirport: airport, focusedInput: Input.DESTINATION_AIRPORT }
      : {},
    state.focusedInput === Input.DESTINATION_AIRPORT
      ? {
          destinationAirport: airport,
          focusedInput: Input.DEPARTURE_DATE,
          showDateRangeSelector: true,
          airportsToSelect: null
        }
      : {}
  );
}

function closeAirportSelector(state) {
  var newState = cloneDeep(state);
  return merge(newState, {
    airportsToSelect: null,
    focusedInput: null
  });
}

function selectDate(state, focusedInput) {
  var newState = cloneDeep(state);
  return merge(newState, {
    focusedInput,
    showDateRangeSelector: true,
    airportsToSelect: null
  });
}

function closeDateRangeSelector(state) {
  var newState = cloneDeep(state);
  return merge(newState, {
    showDateRangeSelector: false,
    focusedInput: null
  });
}

function changeDate(state, departureDate, returnDate) {
  //Our state machine is this
  // after START_DATE it focuses to END_DATE and it stays in END_DATE
  const focusedInput = Input.RETURN_DATE;

  var newState = cloneDeep(state);
  return merge(newState, {
    departureDate,
    returnDate,
    focusedInput
  });
}

function fetchStationsSucceeded(state, stations) {
  testAirports = getAirports(stations);
  var newState = cloneDeep(state);
  return merge(newState, {
    stations
  });
}

function fetchStationsFailed(state) {
  var newState = cloneDeep(state);
  return merge(newState, {
    stations: null,
    airportsToSelect: null
  });
}

function getAirports(stations) {
  return stations.map(station=>new Airport(station.shortName,station.iata));
}
