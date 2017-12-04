import { TravelIata } from '../types/travel';
import {
  RESET_FLIGHT_SELECT,
  FETCH_FLIGHTS_SUCCEEDED,
  FETCH_FLIGHTS_FAILED,
  SELECT_FLIGHT
} from '../actions';
import { assignToNew } from './utils';
import { createFlights, SelectedFlight } from '../types/flight';
import FETCH_ID from './fetch_id';

const defaultState = {
  //domain
  travelIata: new TravelIata(null, null, null, null), // type Travel
  toFlights: [], // type [Flight]
  backFlights: [], // type [Flight]
  //app state
  selectedToFlight: null, // type SelectedFlight or null
  selectedBackFlight: null, // type SelectedFlight or null
  fetching: {
    [FETCH_ID.TO]: false,
    [FETCH_ID.BACK]: false
  }
  //ui state
};

export default function flightSelectReducer(state = defaultState, action) {
  switch (action.type) {
    case RESET_FLIGHT_SELECT:
      return resetFlightSelect(action.travel);
    case FETCH_FLIGHTS_SUCCEEDED:
      return fetchFlightsSucceeded(state, action.flights, action.fetchId);
    case FETCH_FLIGHTS_FAILED:
      return fetchFlightsFailed(state, action.fetchId);
    case SELECT_FLIGHT:
      return selectFlight(state, action.flight, action.service, action.isTo);
    default:
      return state;
  }
}

function resetFlightSelect(travelIata) {
  //fetching happens in dispatch_middleware_for_flight_select triggered by fetching
  return assignToNew(defaultState, {
    travelIata,
    fetching: {
      [FETCH_ID.TO]: true,
      [FETCH_ID.BACK]: !!travelIata.returnDate
    }
  });
}

function fetchFlightsSucceeded(state, flights, fetchId) {
  const flightsKey = fetchId === FETCH_ID.TO ? 'toFlights' : 'backFlights';

  return assignToNew(state, {
    [flightsKey]: createFlights(flights),
    fetching: { [fetchId]: false }
  });
}

function fetchFlightsFailed(state, fetchId) {
  console.log('fetchFlightsFailed using a fake flight list. TODO: when api works adapt it to real failure handling');

  const getFakeFlightsFetch = require('./fake_flights').default;
  const travelIata = state.travelIata;
  const date = fetchId === FETCH_ID.TO ? travelIata.departureDate : travelIata.returnDate;

  return fetchFlightsSucceeded(state, getFakeFlightsFetch(date), fetchId);
}

function selectFlight(state, flight, service, isTo) {
  return assignToNew(state, {
    [isTo ? 'selectedToFlight' : 'selectedBackFlight']: new SelectedFlight(flight,service.service),
  });
}
