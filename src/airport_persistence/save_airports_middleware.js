import { writeAirportsToCookie } from './airport_persistence';
import { AIRPORT_SELECTED } from '../actions';

const saveAirportsMiddleware = ({ getState }) => next => action => {
  next(action);

  if (action.type === AIRPORT_SELECTED) {
    const flightSearch = getState().flightSearch;

    writeAirportsToCookie(
      flightSearch.originAirport,
      flightSearch.destinationAirport
    );
  }
};

export default saveAirportsMiddleware;
