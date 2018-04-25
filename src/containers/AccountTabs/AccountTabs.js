import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, ListGroup, Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { selectAccounts, updatePagination as updatePaginationAction } from '../../modules/account';
import { AccountSummary } from '../AccountSummary/components';
import './AccountTabs.css';
import { TransactionListItem } from './components';

const AccountTabs = ({ accounts, updatePagination }) => {
  const renderTransactionList = ({ transactions, currentPageNumber }) => {
    if (transactions.length === 0) return '';
    return (
      <ListGroup>
        {transactions[currentPageNumber - 1].map(transaction => <TransactionListItem key={transaction.id} {...transaction} />)}
      </ListGroup>
    );
  };

  const renderPagination = ({
    account: { index, currentPageNumber, getLastPageNumber, pageNumbers },
    updatePagination,
  }) => {
    const lastPageNumber = getLastPageNumber();
    const accountIndex = index;
    return (
      <Pagination>
        <Pagination.First disabled={currentPageNumber <= 2} onClick={() => updatePagination({ accountIndex, lastPageNumber, paginationItem: 'first' })} />
        <Pagination.Prev disabled={currentPageNumber <= 1} onClick={() => updatePagination({ accountIndex, lastPageNumber, currentPageNumber, paginationItem: 'prev' })} />

        <Pagination.Item active={currentPageNumber === 1} onClick={() => updatePagination({ accountIndex, lastPageNumber, currentPageNumber, paginationItem: 1 })} >
          {/* {renderPageNumber(1)} */}
          {pageNumbers[0]}
        </Pagination.Item>
        <Pagination.Item active={currentPageNumber === 2} onClick={() => updatePagination({ accountIndex, lastPageNumber, currentPageNumber, paginationItem: 2 })} >
          {/* {renderPageNumber(2)} */}
        </Pagination.Item>
        <Pagination.Item active={currentPageNumber > 2 && currentPageNumber < lastPageNumber - 1} onClick={() => updatePagination({ accountIndex, lastPageNumber, currentPageNumber, paginationItem: 3 })}>
          {/* {renderPageNumber(3)} */}
        </Pagination.Item>
        <Pagination.Item active={currentPageNumber === lastPageNumber - 1} onClick={() => updatePagination({ accountIndex, lastPageNumber, currentPageNumber, paginationItem: 4 })}>
          {/* {renderPageNumber(4)} */}
        </Pagination.Item>
        <Pagination.Item active={currentPageNumber === lastPageNumber} onClick={() => updatePagination({ accountIndex, lastPageNumber, currentPageNumber, paginationItem: 5 })}>
          {/* {renderPageNumber(5)} */}
        </Pagination.Item>

        <Pagination.Next disabled={currentPageNumber - 1 >= lastPageNumber} onClick={() => updatePagination({ currentPageNumber, paginationItem: 'next' })} />
        <Pagination.Last disabled={currentPageNumber - 2 >= lastPageNumber} onClick={() => updatePagination({ currentPageNumber, paginationItem: 'last' })} />
      </Pagination>
    );
  };

  const renderTabs = () => {
    return accounts.map((account, index) => {
      return (
        <Tab key={account.type} eventKey={index} title={account.type}>
          <AccountSummary {...account} containerStyle={{ marginTop: 32 }} />
          {renderTransactionList({ transactions: account.transactions, currentPageNumber: account.currentPageNumber })}
          {renderPagination({ account, updatePagination })}
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
    pageNumbers: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      amount: PropTypes.number,
      balance: PropTypes.number,
      transactionDate: PropTypes.string,
      postingDate: PropTypes.string,
    }))).isRequired,
  })).isRequired,
  updatePagination: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { accounts: selectAccounts(state) };
};
export default connect(mapStateToProps, { updatePagination: updatePaginationAction })(AccountTabs);
