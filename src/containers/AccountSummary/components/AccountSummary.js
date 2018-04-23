import React from 'react';
import { Well, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './AccountSummary.css';

export const AccountSummary = ({
  totalAmount, totalWithdrawalAmount, totalDepositAmount, containerStyle,
}) => {
  return (
    <Well style={containerStyle}>
      <Row>
        <Col sm={4}>Total: ${totalAmount}</Col>
        <Col sm={4}>Total Withdrawals: ${totalWithdrawalAmount}</Col>
        <Col sm={4}>Total Deposit: ${totalDepositAmount}</Col>
      </Row>
    </Well>
  );
};

AccountSummary.defaultProps = {
  containerStyle: {},
};

AccountSummary.propTypes = {
  containerStyle: PropTypes.shape({}),
  totalAmount: PropTypes.number.isRequired,
  totalWithdrawalAmount: PropTypes.number.isRequired,
  totalDepositAmount: PropTypes.number.isRequired,
};
