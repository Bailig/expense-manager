import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { onTransactionChange } from '../modules/transaction';
import Header from './Header';
import AllAccountSummary from './AccountSummary/AllAccountSummary';
import FilteringForm from './FilteringForm/FilteringForm';
import AccountTabs from './AccountTabs/AccountTabs';

class App extends Component {
  componentWillMount() {
    this.props.onTransactionChange();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Row>
            <Col md={3} >
              <FilteringForm />
            </Col>
            <Col md={9}>
              <AllAccountSummary />
              <AccountTabs />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  onTransactionChange: PropTypes.func.isRequired,
};

export default connect(null, { onTransactionChange })(App);
