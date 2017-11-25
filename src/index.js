import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { flightSearchReducer } from './reducers/flight_search_reducer';
import { Provider } from 'react-redux';

let store = createStore(
  flightSearchReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
