import { all, call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_STATIONS, FETCH_STATIONS_SUCCEEDED, FETCH_STATIONS_FAILED } from '../actions';
import {apifetchStations} from '../api';

function* fetchStations() {
  try {
    const stations = yield call(apifetchStations);
    yield put({type: FETCH_STATIONS_SUCCEEDED, stations})
  } catch (e) {
    yield put(FETCH_STATIONS_FAILED);
  }
}

function* watchFetchStations() {
  yield takeLatest(FETCH_STATIONS, fetchStations);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchFetchStations()]);
}
