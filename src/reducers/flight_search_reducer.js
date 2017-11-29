import moment from 'moment';
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

// TODO restructure state
// const defaultState = {
//   //domain
//   stations: null
//   //app state
//   departureDate: moment(),
//   returnDate: null, //null means OneWay
//   originAirport: null,
//   destinationAirport: null,
//   //ui state
//   focusedInput: null, // null or an Input value
//   selector: null,// null or an Selector value //one of null, DATE_RANGE_SELECTOR, AIRPORT_SELECTOR
// };

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
  return createNewState(state, {
    airportsToSelect: testAirports,
    focusedInput: Input.ORIGIN_AIRPORT,
    showDateRangeSelector: false
  });
}

function selectDestinationAirport(state) {
  return createNewState(state, {
    airportsToSelect: testAirports,
    focusedInput: Input.DESTINATION_AIRPORT,
    showDateRangeSelector: false
  });
}

function airportSelected(state, airport) {
  return createNewState(
    state,
    (function() {
      switch (state.focusedInput) {
        case Input.ORIGIN_AIRPORT:
          return {
            originAirport: airport,
            focusedInput: Input.DESTINATION_AIRPORT
          };
        case Input.DESTINATION_AIRPORT:
          return {
            destinationAirport: airport,
            focusedInput: Input.DEPARTURE_DATE,
            showDateRangeSelector: true,
            airportsToSelect: null
          };
        default:
          return {};
      }
    })()
  );
}

function closeAirportSelector(state) {
  return createNewState(state, {
    airportsToSelect: null,
    focusedInput: null
  });
}

function selectDate(state, focusedInput) {
  return createNewState(state, {
    focusedInput,
    showDateRangeSelector: true,
    airportsToSelect: null
  });
}

function closeDateRangeSelector(state) {
  return createNewState(state, {
    showDateRangeSelector: false,
    focusedInput: null
  });
}

function changeDate(state, departureDate, returnDate) {
  //Our state machine is this
  // after START_DATE it focuses to END_DATE and it stays in END_DATE
  const focusedInput = Input.RETURN_DATE;
  return createNewState(state, {
    departureDate,
    returnDate,
    focusedInput
  });
}

function fetchStationsSucceeded(state, stations) {
  testAirports = getAirports(stations);
  return createNewState(state, { stations });
}

function fetchStationsFailed(state) {
  console.log('fetchStationsFailed using a fake station list');
  const fakeStations = [
    new Airport('Aberdeen', 'ABZ'),
    new Airport('Alesund', 'AES'),
    new Airport('Bari', 'BRI'),
    new Airport('Bergen', 'BGO'),
    new Airport('Budapest', 'BUD'),
    new Airport('Bristol', 'BRS'),
    new Airport('Brno', 'BRQ'),
    new Airport('Debrecen', 'DEB'),
    new Airport('Malaga', 'AGP'),
    new Airport('Milan', 'BGY')
  ];
  testAirports = getAirports(fakeStations);
  return createNewState(state, {
    stations: fakeStations,
    airportsToSelect: null
  });
}

function getAirports(stations) {
  return stations.map(station => new Airport(station.shortName, station.iata));
}

function createNewState(oldObject, newValues) {
  return Object.assign({}, oldObject, newValues);
}
