import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from '../modules';
import Header from './Header';

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk, logger)),
);

class App extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
        </div>
      </Provider>
    );
  }
}

export default App;
