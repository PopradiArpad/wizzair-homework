import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import flightSearch from './reducers/flight_search_reducer';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/sagas';
import { FETCH_STATIONS } from './actions';
import saveAirportsMiddleware from './airport_persistence/save_airports_middleware';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  combineReducers({ flightSearch }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(saveAirportsMiddleware, sagaMiddleware)
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

store.dispatch({ type: FETCH_STATIONS });
