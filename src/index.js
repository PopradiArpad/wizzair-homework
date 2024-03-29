import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import flightSearch from './reducers/flight_search_reducer';
import flightSelect from './reducers/flight_select_reducer';
import dispatchForFlightSelectMiddleware from './reducers/dispatch_middleware_for_flight_select';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/sagas';
import saveAirportsMiddleware from './airport_persistence/save_airports_middleware';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  combineReducers({ flightSearch, flightSelect }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    saveAirportsMiddleware,
    dispatchForFlightSelectMiddleware,
    sagaMiddleware
  )
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
