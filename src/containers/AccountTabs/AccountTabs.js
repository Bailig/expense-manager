import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { selectAccounts } from '../../modules/account';

const AccountTabs = ({ accounts }) => {
  const renderTabs = () => {
    return accounts.map((account, index) => {
      return (
        <Tab key={account.type} eventKey={index} title={account.type}>
          {/* {account.transactions} */}
        </Tab>
      );
    });
  };
  return (
    <Tabs justified defaultActiveKey={2} id="account-tabs">
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
