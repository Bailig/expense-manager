import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, ListGroupItem, ListGroup, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { selectAccounts } from '../../modules/account';
import { AccountSummary } from '../AccountSummary/components';
import './AccountTabs.css';

const AccountTabs = ({ accounts }) => {
  const renderDataWithTooltips = ({ id, data, text }) => {
    if (!data) return '';
    return (
      <OverlayTrigger placement="top" overlay={<Tooltip id={`${id}-${text}`}>{text}</Tooltip>}>
        <span>{data}</span>
      </OverlayTrigger>
    );
  };
  const renderTransactions = (transactions) => {
    return transactions.map((transaction) => {
      return (
        <ListGroupItem key={transaction.id}>
          <Row>
            <Col sm={5}>
              {renderDataWithTooltips({ id: transaction.id, data: transaction.description, text: 'Description' })}
            </Col>
            <Col sm={1}>
              {renderDataWithTooltips({ id: transaction.id, data: transaction.amount, text: 'Amount' })}
            </Col>
            <Col sm={2}>
              {renderDataWithTooltips({ id: transaction.id, data: transaction.balance, text: 'Balance' })}
            </Col>
            <Col sm={2}>
              {renderDataWithTooltips({ id: transaction.id, data: transaction.transactionDate, text: 'Transaction Date' })}
            </Col>
            <Col sm={2}>
              {renderDataWithTooltips({ id: transaction.id, data: transaction.postingDate, text: 'Posting Date' })}
            </Col>
          </Row>
        </ListGroupItem>
      );
    });
  };

  const renderTabs = () => {
    return accounts.map((account, index) => {
      return (
        <Tab key={account.type} eventKey={index} title={account.type}>
          <AccountSummary {...account} containerStyle={{ marginTop: 32 }} />
          <ListGroup>
            {renderTransactions(account.transactions)}
          </ListGroup>
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
