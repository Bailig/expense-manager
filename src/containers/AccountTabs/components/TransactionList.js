import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { TransactionListItem } from './index';

export const TransactionList = ({ transactions, currentPageIndex }) => {
  if (!transactions[currentPageIndex]) return '';
  return (
    <ListGroup>
      {transactions[currentPageIndex].map(transaction => <TransactionListItem key={transaction.id} {...transaction} />)}
    </ListGroup>
  );
};

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    balance: PropTypes.number,
    transactionDate: PropTypes.string.isRequired,
    postingDate: PropTypes.string,
  }).isRequired).isRequired).isRequired,
  currentPageIndex: PropTypes.number.isRequired,
};
