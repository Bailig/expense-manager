import React from 'react';
import { ListGroupItem, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { TransactionPropTooltip } from './index';

export const TransactionListItem = ({
  id, description, amount, balance, transactionDate, postingDate,
}) => {
  return (
    <ListGroupItem key={id}>
      <Row>
        <Col sm={5}>
          <TransactionPropTooltip transactionId={id} data={description} text="Description" />
        </Col>
        <Col sm={1}>
          <TransactionPropTooltip transactionId={id} data={amount} text="Amount" />
        </Col>
        <Col sm={2}>
          <TransactionPropTooltip transactionId={id} data={balance} text="Balance" />
        </Col>
        <Col sm={2}>
          <TransactionPropTooltip transactionId={id} data={transactionDate} text="Transaction Date" />
        </Col>
        <Col sm={2}>
          <TransactionPropTooltip transactionId={id} data={postingDate} text="Posting Date" />
        </Col>
      </Row>
    </ListGroupItem>
  );
};

TransactionListItem.defaultProps = {
  balance: null,
  postingDate: null,
};

TransactionListItem.propTypes = {
  id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  balance: PropTypes.number,
  transactionDate: PropTypes.string.isRequired,
  postingDate: PropTypes.string,
};
