import FETCH_ID from './fetch_id';
import {
  FETCH_FLIGHTS,
  FETCH_FLIGHTS_SUCCEEDED,
  FETCH_FLIGHTS_FAILED
} from '../actions';

//Dispatcher that allows only one fetch running per FETCH_ID
class Dispatcher {
  constructor(dispatch) {
    this.running = {
      [FETCH_ID.TO]: false,
      [FETCH_ID.BACK]: false
    };
    this.dispatch = dispatch;
  }

  refreshRunningState(action) {
    switch (action.type) {
      case FETCH_FLIGHTS:
        this.running[action.fetchId] = true;
        break;
      case FETCH_FLIGHTS_SUCCEEDED:
      case FETCH_FLIGHTS_FAILED:
        this.running[action.fetchId] = false;
        break;
      default:
    }
  }

  isDispatchNeeded(fetching, fetchId) {
    return fetching[fetchId] && !this.running[fetchId];
  }

  dispatchToFetchIfNeeded(fetching, travelIata, fetchId) {
    if (this.isDispatchNeeded(fetching, fetchId)) {
      this.dispatch({
        type: FETCH_FLIGHTS,
        fetchId,
        departureIata: travelIata.originIata,
        arrivalIata: travelIata.destinationIata,
        date: travelIata.departureDate
      });
    }
  }

  dispatchBackFetchIfNeeded(fetching, travelIata, fetchId) {
    if (this.isDispatchNeeded(fetching, fetchId)) {
      this.dispatch({
        type: FETCH_FLIGHTS,
        fetchId,
        departureIata: travelIata.destinationIata,
        arrivalIata: travelIata.originIata,
        date: travelIata.returnDate
      });
    }
  }
}

export default ({ getState, dispatch }) => {
  const dispatcher = new Dispatcher(dispatch);

  return next => action => {
    next(action);

    dispatcher.refreshRunningState(action);

    const flightSelect = getState().flightSelect;
    const fetching = flightSelect.fetching;
    const travelIata = flightSelect.travelIata;
    dispatcher.dispatchToFetchIfNeeded(fetching, travelIata, FETCH_ID.TO);
    dispatcher.dispatchBackFetchIfNeeded(fetching, travelIata, FETCH_ID.BACK);
  };
};
