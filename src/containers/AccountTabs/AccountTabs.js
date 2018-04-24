import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, ListGroup, Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { selectAccounts, updateAccountPageNumber as updateAccountPageNumberAction } from '../../modules/account';
import { AccountSummary } from '../AccountSummary/components';
import './AccountTabs.css';
import { TransactionListItem } from './components';

const AccountTabs = ({ accounts, updateAccountPageNumber }) => {
  const renderTransactionList = ({ transactions, currentPageNumber }) => {
    if (transactions.length === 0) return '';
    return (
      <ListGroup>
        {transactions[currentPageNumber - 1].map(transaction => <TransactionListItem key={transaction.id} {...transaction} />)}
      </ListGroup>
    );
  };

  const renderPagination = ({ account: { currentPageNumber, getLastPageNumber }, index }) => {
    const lastPageNumber = getLastPageNumber();
    const renderPageNumber = (paginationItemPosition) => {
      if (currentPageNumber <= 3) {
        return paginationItemPosition;
      } else if (currentPageNumber > 3 && currentPageNumber <= lastPageNumber - 2) {
        switch (paginationItemPosition) {
          case 1:
            return currentPageNumber - 2;
          case 2:
            return currentPageNumber - 1;
          case 3:
            return currentPageNumber;
          case 4:
            return currentPageNumber + 1;
          case 5:
            return currentPageNumber + 2;
          default:
            break;
        }
      } else {
        switch (paginationItemPosition) {
          case 1:
            return lastPageNumber - 4;
          case 2:
            return lastPageNumber - 3;
          case 3:
            return lastPageNumber - 2;
          case 4:
            return lastPageNumber - 1;
          case 5:
            return lastPageNumber;
          default:
            break;
        }
      }
    };
    // TODO update page number handler reqired
    return (
      <Pagination>
        <Pagination.First disabled={currentPageNumber <= 2} />
        <Pagination.Prev disabled={currentPageNumber <= 1} />

        <Pagination.Item active={currentPageNumber === 1}>{renderPageNumber(1)}</Pagination.Item>
        <Pagination.Item active={currentPageNumber === 2}>{renderPageNumber(2)}</Pagination.Item>
        <Pagination.Item active={currentPageNumber > 2 && currentPageNumber < lastPageNumber - 1}>{renderPageNumber(3)}</Pagination.Item>
        <Pagination.Item active={currentPageNumber === lastPageNumber - 1}>{renderPageNumber(4)}</Pagination.Item>
        <Pagination.Item active={currentPageNumber === lastPageNumber}>{renderPageNumber(5)}</Pagination.Item>

        <Pagination.Next disabled={currentPageNumber - 1 >= lastPageNumber} />
        <Pagination.Last disabled={currentPageNumber - 2 >= lastPageNumber} />
      </Pagination>
    );
  };

  const renderTabs = () => {
    return accounts.map((account, index) => {
      return (
        <Tab key={account.type} eventKey={index} title={account.type}>
          <AccountSummary {...account} containerStyle={{ marginTop: 32 }} />
          {renderTransactionList({ transactions: account.transactions, currentPageNumber: account.currentPageNumber })}
          {renderPagination({ account, index })}
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
  accounts: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    totalDepositAmount: PropTypes.number.isRequired,
    totalWithdrawalAmount: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    getLastPageNumber: PropTypes.func.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      amount: PropTypes.number,
      balance: PropTypes.number,
      transactionDate: PropTypes.string,
      postingDate: PropTypes.string,
    }))).isRequired,
  })).isRequired,
  updateAccountPageNumber: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { accounts: selectAccounts(state) };
};
export default connect(mapStateToProps, { updateAccountPageNumber: updateAccountPageNumberAction })(AccountTabs);
