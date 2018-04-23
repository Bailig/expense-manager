import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectTotalAmount,
  selectTotalWithdrawalAmount,
  selectTotalDepositAmount,
} from '../../modules/transaction';
import { AccountSummary } from './components';

const AllAccountSummary = props => <AccountSummary {...props} />;

AllAccountSummary.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  totalWithdrawalAmount: PropTypes.number.isRequired,
  totalDepositAmount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    totalAmount: selectTotalAmount(state),
    totalWithdrawalAmount: selectTotalWithdrawalAmount(state),
    totalDepositAmount: selectTotalDepositAmount(state),
  };
};

export default connect(mapStateToProps)(AllAccountSummary);
