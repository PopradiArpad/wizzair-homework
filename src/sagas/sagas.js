import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  FETCH_STATIONS,
  FETCH_STATIONS_SUCCEEDED,
  FETCH_STATIONS_FAILED,
  FETCH_FLIGHTS,
  FETCH_FLIGHTS_SUCCEEDED,
  FETCH_FLIGHTS_FAILED
} from '../actions';
import { apifetchStations, apiFetchFlights } from '../api';

function* fetchStations() {
  try {
    const stations = yield call(apifetchStations);
    yield put({ type: FETCH_STATIONS_SUCCEEDED, stations });
  } catch (e) {
    yield put({ type: FETCH_STATIONS_FAILED });
  }
}

function* fetchFlights(params) {
  const fetchId = params.fetchId;

  try {
    const flights = yield call(
      apiFetchFlights,
      params.departureIata,
      params.arrivalIata,
      params.date
    );
    yield put({ type: FETCH_FLIGHTS_SUCCEEDED, flights, fetchId });
  } catch (e) {
    yield put({ type: FETCH_FLIGHTS_FAILED, fetchId });
  }
}

function* watchFetchStations() {
  yield takeLatest(FETCH_STATIONS, fetchStations);
}

function* watchFetchFlights() {
  yield takeEvery(FETCH_FLIGHTS, fetchFlights);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchFetchStations(), watchFetchFlights()]);
}
