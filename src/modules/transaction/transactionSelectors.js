import { createSelector } from 'reselect';

const selectTransactions = state => state.transaction.transactions;


export const selectTotalAmount = createSelector(
  selectTransactions,
  (transactions) => {
    if (!transactions) return 0;
    let totalAmount = 0;
    Object.entries(transactions)
      .filter(idTransactionPair => !Number.isNaN(Number.parseFloat(idTransactionPair[1].amount)))
      .forEach((idTransactionPair) => {
        totalAmount += idTransactionPair[1].amount;
      });
    return Math.round(totalAmount * 100) / 100;
  },
);

export const selectTotalWithdrawalAmount = createSelector(
  selectTransactions,
  (transactions) => {
    if (!transactions) return 0;
    let totalAmount = 0;
    Object.entries(transactions)
      .filter(idTransactionPair => idTransactionPair[1].amount < 0)
      .forEach((idTransactionPair) => {
        totalAmount += idTransactionPair[1].amount;
      });
    return Math.round(totalAmount * 100) / 100;
  },
);

export const selectTotalDepositAmount = createSelector(
  selectTransactions,
  (transactions) => {
    if (!transactions) return 0;
    let totalAmount = 0;
    Object.entries(transactions)
      .filter(idTransactionPair => idTransactionPair[1].amount > 0)
      .forEach((idTransactionPair) => {
        totalAmount += idTransactionPair[1].amount;
      });
    return Math.round(totalAmount * 100) / 100;
  },
);

