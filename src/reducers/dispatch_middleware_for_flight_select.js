import { RESET_FLIGHT_SELECT, FETCH_FLIGHTS } from '../actions';

export default ({
  getState,
  dispatch
}) => next => action => {
  next(action);
  if (action.type === RESET_FLIGHT_SELECT) {
    const travel = getState().flightSelect.travelIata;
    dispatch({
      type: FETCH_FLIGHTS,
      departureIata: travel.originIata,
      arrivalIata: travel.destinationIata,
      date: travel.departureDate
    });
  }
};
