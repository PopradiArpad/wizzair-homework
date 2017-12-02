import { writeAirportsToCookie } from './airport_persistence';
import { AIRPORT_SELECTED } from '../actions';

const saveAirportsMiddleware = ({ getState }) => next => action => {
  next(action);

  if (action.type === AIRPORT_SELECTED) {
    const travel = getState().flightSearch.travel;

    writeAirportsToCookie(
      travel.originAirport,
      travel.destinationAirport
    );
  }
};

export default saveAirportsMiddleware;
