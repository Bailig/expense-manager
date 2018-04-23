import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, ListGroupItem, ListGroup, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { selectAccounts } from '../../modules/account';
import { AccountSummary } from '../AccountSummary/components';
import './AccountTabs.css';
import { TransactionListItem } from './components';

const AccountTabs = ({ accounts }) => {
  const renderTransactionList = (transactions) => {
    return (
      <ListGroup>
        {transactions.map(transaction => <TransactionListItem {...transaction} />)}
      </ListGroup>
    );
  };

  const renderTabs = () => {
    return accounts.map((account, index) => {
      return (
        <Tab key={account.type} eventKey={index} title={account.type}>
          <AccountSummary {...account} containerStyle={{ marginTop: 32 }} />
          {renderTransactionList(account.transactions)}
        </Tab>
      );
    });
  };

  return (
    <Tabs justified defaultActiveKey={2} animation={false} id="account-tabs" style={{ marginTop: 60 }}>
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
