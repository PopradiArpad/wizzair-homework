import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { dateReducer } from './reducers/date_reducer';
import { Provider } from 'react-redux';

let store = createStore(dateReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
