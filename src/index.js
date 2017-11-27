import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { flightSearchReducer } from './reducers/flight_search_reducer';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas/sagas';
import {FETCH_STATIONS} from './actions';

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
  flightSearchReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

store.dispatch({type:FETCH_STATIONS});
