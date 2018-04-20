import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';

import {
  selectTotalAmount,
  selectTotalWithdrawalAmount,
  selectTotalDepositAmount,
} from '../../modules/transaction';

const AllAccountSummary = ({
  totalAmount,
  totalWithdrawalAmount,
  totalDepositAmount,
}) => {
  return (
    <Jumbotron>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <span>Total: ${totalAmount}</span>
        <span>Total Withdrawals: ${totalWithdrawalAmount}</span>
        <span>Total Deposit: ${totalDepositAmount}</span>
      </div>
    </Jumbotron>
  );
};

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
