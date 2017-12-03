import {TravelIata} from '../types/travel';
import {
  RESET_FLIGHT_SELECT,
  FETCH_FLIGHTS,
  FETCH_FLIGHTS_SUCCEEDED,
  FETCH_FLIGHTS_FAILED
} from '../actions';
import { assignToNew, mergeToNew } from './utils';

const FETCH = {
  TO: 'TO',
  BACK: 'BACK'
};

const defaultState = {
  //domain
  travelIata: new TravelIata(null, null, null, null), // type Travel
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
      //REMARK: see dispatch_middleware_for_flight_select too!
      return resetFlightSelect(action.travel);
    // case FETCH_FLIGHTS_SUCCEEDED:
    //   return fetchFlightsSucceeded(state, action.flights);
    // case FETCH_FLIGHTS_FAILED:
    //   return fetchFlightsFailed(state);
    default:
      return state;
  }
}

function resetFlightSelect(travelIata) {
  return assignToNew(defaultState, { travelIata, fetchingFor: FETCH.TO });
}
