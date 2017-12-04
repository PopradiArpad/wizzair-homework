import moment from 'moment';
import createStations from '../types/stations';
import Input from '../types/input';
import { TravelAirport } from '../types/travel';
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
import { readAirportsFromCookie } from '../airport_persistence/airport_persistence';
import { assignToNew, mergeToNew } from './utils';

const airportsFromCookie = readAirportsFromCookie();

const defaultState = {
  //domain
  stations: null,
  //app state
  travel: new TravelAirport(
    airportsFromCookie.originAirport,
    airportsFromCookie.destinationAirport,
    moment(),
    null
  ),
  //ui state
  focusedInput: null, // type Input value or null
  showDateRangeSelector: false,
  airportsToSelect: [], // type [Airport]
  searchEnabled: false
};

export default function flightSearchReducer(state = defaultState, action) {
  //set the independent states
  const newState = flightSearchReducerI(state, action);

  //set the dependent/derived states
  return assignToNew(newState, {
    searchEnabled: isSearchEnabled(newState)
  });
}

function flightSearchReducerI(state = defaultState, action) {
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
  return assignToNew(state, {
    airportsToSelect: state.stations.getAllAirports(),
    focusedInput: Input.ORIGIN_AIRPORT,
    showDateRangeSelector: false
  });
}

function selectDestinationAirport(state) {
  const originAirport = state.travel.originAirport;
  return originAirport
    ? assignToNew(state, {
        airportsToSelect: state.stations.getConnectedAirportsOf(originAirport),
        focusedInput: Input.DESTINATION_AIRPORT,
        showDateRangeSelector: false
      })
    : state;
}

function airportSelected(state, airport) {
  return assignToNew(
    state,
    (function() {
      switch (state.focusedInput) {
        case Input.ORIGIN_AIRPORT:
          return {
            travel: mergeToNew(state.travel, {
              originAirport: airport,
              destinationAirport: null
            }),
            focusedInput: Input.DESTINATION_AIRPORT,
            airportsToSelect: state.stations.getConnectedAirportsOf(airport)
          };
        case Input.DESTINATION_AIRPORT:
          return {
            travel: mergeToNew(state.travel, { destinationAirport: airport }),
            focusedInput: Input.DEPARTURE_DATE,
            showDateRangeSelector: true,
            airportsToSelect: []
          };
        default:
          return {};
      }
    })()
  );
}

function closeAirportSelector(state) {
  return assignToNew(state, {
    airportsToSelect: [],
    focusedInput: null
  });
}

function selectDate(state, focusedInput) {
  return assignToNew(state, {
    focusedInput,
    showDateRangeSelector: true,
    airportsToSelect: []
  });
}

function closeDateRangeSelector(state) {
  return assignToNew(state, {
    showDateRangeSelector: false,
    focusedInput: null
  });
}

function changeDate(state, departureDate, returnDate) {
  //Our state machine is this
  // after START_DATE it focuses to END_DATE and it stays in END_DATE
  const focusedInput = Input.RETURN_DATE;
  return assignToNew(state, {
    travel: mergeToNew(state.travel, { departureDate, returnDate }),
    focusedInput
  });
}

function fetchStationsSucceeded(state, stations) {
  return assignToNew(state, { stations: createStations(stations), airportsToSelect: [] });
}

function fetchStationsFailed(state) {
  console.log('fetchStationsFailed using a fake station list');
  const fakeStationsFetch = require('./fake_stations').default;
  return fetchStationsSucceeded(state, fakeStationsFetch);
}

function isSearchEnabled({
  travel: { originAirport, destinationAirport, departureDate },
  showDateRangeSelector,
  airportsToSelect
}) {
  return (
    !!originAirport &&
    !!destinationAirport &&
    !!departureDate &&
    !showDateRangeSelector &&
    airportsToSelect.length === 0
  );
}
