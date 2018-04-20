import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import { firebaseConfig } from './util/config';
import reducers from './modules';

firebase.initializeApp(firebaseConfig);

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk, logger)),
);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
