import { createSelector } from 'reselect';
import { selectFilteringProps } from '../filteringForm';

export const selectTransactions = state => state.transaction.transactions;


const dateIsBetweenDates = (date, startDate, endDate) => {
  if (!date) return;
  if (startDate && endDate) {
    if (date >= startDate && date <= endDate) {
      return true;
    }
  } else if (startDate && !endDate) {
    if (date >= startDate) {
      return true;
    }
  } else if (!startDate && endDate) {
    if (date <= startDate) {
      return true;
    }
  } else if (!startDate && !endDate) {
    return true;
  }
};

export const selectFilteredTransactions = createSelector(
  selectTransactions,
  selectFilteringProps,
  (transactions, filteringProps) => {
    const {
      searchKeyword,
      startDate,
      endDate,
      showDeposit,
      showWithdrawal,
    } = filteringProps;

    if (!transactions) return {};

    const filteredTransactions = {};
    Object.entries(transactions).forEach((idTransactionPair) => {
      const transaction = idTransactionPair[1];
      const transactionId = idTransactionPair[0];
      if (!transaction.description) return;
      if (transaction.description.toLowerCase().indexOf(searchKeyword.toLowerCase()) === -1) return;
      if (!dateIsBetweenDates(transaction.transactionDate, startDate, endDate)) return;
      if (!showDeposit && transaction.amount > 0) return;
      if (!showWithdrawal && transaction.amount < 0) return;
      filteredTransactions[transactionId] = transaction;
    });
    return filteredTransactions;
  },
);

// export const calculateTotalAmountOfTransactions = (transactions) => {
//   if (!transactions) return 0;
//   let totalAmount = 0;
//   let transactionArray = [];
//   if (_.isObject(transactions)) {
//     transactionArray = Object.entries(transactions)
//       .map(idTransactionPair => ({ ...idTransactionPair[1], id: idTransactionPair[0] }));
//   }
//   if (_.isArray(transactions)) {
//     transactionArray = transactions;
//   }
//   transactionArray
//     .filter(transaction => !Number.isNaN(Number.parseFloat(transaction.amount)))
//     .forEach((transaction) => {
//       totalAmount += transaction.amount;
//     });
//   return Math.round(totalAmount * 100) / 100;
// };
export const calculateTotalAmountOfTransactions = (transactions) => {
  if (!transactions) return 0;
  let totalAmount = 0;
  Object.entries(transactions)
    .filter(idTransactionPair => !Number.isNaN(Number.parseFloat(idTransactionPair[1].amount)))
    .forEach((idTransactionPair) => {
      totalAmount += idTransactionPair[1].amount;
    });
  return Math.round(totalAmount * 100) / 100;
};

export const selectTotalAmount = createSelector(
  selectFilteredTransactions,
  calculateTotalAmountOfTransactions,
);

export const calculateTotalWithdrawalAmountOfTransactions = (transactions) => {
  if (!transactions) return 0;
  let totalAmount = 0;
  Object.entries(transactions)
    .filter(idTransactionPair => idTransactionPair[1].amount < 0)
    .forEach((idTransactionPair) => {
      totalAmount += idTransactionPair[1].amount;
    });
  return Math.round(totalAmount * 100) / 100;
};


export const selectTotalWithdrawalAmount = createSelector(
  selectFilteredTransactions,
  calculateTotalWithdrawalAmountOfTransactions,
);

export const calculateTotalDepositAmountOfTransactions = (transactions) => {
  if (!transactions) return 0;
  let totalAmount = 0;
  Object.entries(transactions)
    .filter(idTransactionPair => idTransactionPair[1].amount > 0)
    .forEach((idTransactionPair) => {
      totalAmount += idTransactionPair[1].amount;
    });
  return Math.round(totalAmount * 100) / 100;
};

export const selectTotalDepositAmount = createSelector(
  selectFilteredTransactions,
  calculateTotalDepositAmountOfTransactions,
);
