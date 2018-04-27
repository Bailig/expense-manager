import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

import { selectAccounts, updatePage as updatePageAction } from '../../modules/account';
import { AccountSummary } from '../AccountSummary/components';
import { TransactionList } from './components';
import './AccountTabs.css';

const AccountTabs = ({ accounts, updatePage }) => {
  const renderTabs = () => {
    return accounts.map((account, index) => {
      return (
        <Tab key={account.type} eventKey={index} title={account.type}>
          <AccountSummary {...account} containerStyle={{ marginTop: 32 }} />
          <TransactionList {...account} />
          <ReactPaginate
            initialPage={account.currentPageIndex}
            pageCount={account.pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            breakLabel={<span>...</span>}
            onPageChange={data => updatePage({ accountIndex: index, pageIndex: data.selected })}
          />
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
    currentPageIndex: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      balance: PropTypes.number,
      transactionDate: PropTypes.string.isRequired,
      postingDate: PropTypes.string,
    }).isRequired).isRequired).isRequired,
  })).isRequired,
  updatePage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { accounts: selectAccounts(state) };
};
export default connect(mapStateToProps, { updatePage: updatePageAction })(AccountTabs);
