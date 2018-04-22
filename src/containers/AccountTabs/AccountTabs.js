import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, ListGroupItem, ListGroup, Row, Col, Well } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { selectAccounts } from '../../modules/account';

const AccountTabs = ({ accounts }) => {
  const renderTransactions = (transactions) => {
    return transactions.map((transaction) => {
      return (
        <ListGroupItem key={transaction.id}>
          <Row>
            <Col sm={5}>
              {transaction.description}
            </Col>
            <Col sm={1}>
              ${transaction.amount || 0}
            </Col>
            <Col sm={2}>
              {transaction.balance ? `$${transaction.balance}` : ''}
            </Col>
            <Col sm={2}>
              {transaction.transactionDate}
            </Col>
            <Col sm={2}>
              {transaction.postingDate}
            </Col>
          </Row>
        </ListGroupItem>
      );
    });
  };

  // const renderSubAccountSummary = (account) => {

  // };

  const renderTabs = () => {
    return accounts.map((account, index) => {
      return (
        <Tab key={account.type} eventKey={index} title={account.type}>
          {/* {renderSubAccountSummary(account)} */}
          <ListGroup>
            {renderTransactions(account.transactions)}
          </ListGroup>
        </Tab>
      );
    });
  };

  return (
    <Tabs justified defaultActiveKey={2} animation={false} id="account-tabs">
      {renderTabs()}
    </Tabs>
  );
};

AccountTabs.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string.isRequired })).isRequired,
};

const mapStateToProps = (state) => {
  return { accounts: selectAccounts(state) };
};
export default connect(mapStateToProps)(AccountTabs);
