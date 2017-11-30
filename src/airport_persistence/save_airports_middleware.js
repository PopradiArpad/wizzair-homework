import { writeAirportsToCookie } from './airport_persistence';
import { AIRPORT_SELECTED } from '../actions';

const saveAirportsMiddleware = ({ getState }) => next => action => {
  next(action);
  if (action.type === AIRPORT_SELECTED) {
    const state = getState();
    writeAirportsToCookie(state.originAirport, state.destinationAirport);
  }
};

export default saveAirportsMiddleware;
