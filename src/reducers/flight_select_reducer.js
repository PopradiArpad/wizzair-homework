import {
  RESET_FLIGHT_SELECT,
  FETCH_FLIGHTS,
  FETCH_FLIGHTS_SUCCEEDED,
  FETCH_FLIGHTS_FAILED
} from '../actions';
import { assignToNew } from './utils';

const FETCH = {
  DEPARTURE: 'DEPARTURE',
  RETURN: 'RETURN'
};

const defaultState = {
  //domain
  originAirport: null, // type Airport or null
  destinationAirport: null, // type Airport or null
  departureDate: null, // type Moment or null
  returnDate: null, //null means OneWay // type Moment or null
  departureFlights: [], // type [Flight]
  returnFlights: [], // type [Flight]
  //app state
  selectedDepartureFlight: null, // type Flight or null
  selectedReturnFlight: null, // type Flight or null
  fetchingFor: null // type FETCH value or null
  //ui state
};

export default function flightSelectReducer(state = defaultState, action) {
  switch (action.type) {
    case RESET_FLIGHT_SELECT:
      return resetFlightSelect(
        action.originAirport,
        action.destinationAirport,
        action.departureDate,
        action.returnDate
      );
    // case FETCH_FLIGHTS_SUCCEEDED:
    //   return fetchFlightsSucceeded(state, action.flights);
    // case FETCH_FLIGHTS_FAILED:
    //   return fetchFlightsFailed(state);
    default:
      return state;
  }
}

function resetFlightSelect(
  originAirport,
  destinationAirport,
  departureDate,
  returnDate
) {
  return assignToNew(defaultState, {
    originAirport,
    destinationAirport,
    departureDate,
    returnDate
  });
}
