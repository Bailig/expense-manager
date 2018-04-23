import _ from 'lodash';
import { createSelector } from 'reselect';

import {
  selectFilteredTransactions,
  calculateTotalAmountOfTransactions,
  calculateTotalDepositAmountOfTransactions,
  calculateTotalWithdrawalAmountOfTransactions,
} from '../transaction';
import { selectFilteringProps } from '../filteringForm';

export const handleAssigningTransactionsAndShowingBalance = ({
  transactions = [],
  accounts = [
    { type: 'Chequing', transactions: [] },
    { type: 'Savings', transactions: [] },
    { type: 'Master', transactions: [] },
  ],
  showBalance = true,
}) => {
  if (!transactions) return accounts;
  Object.entries(transactions).forEach((idTransactionPair) => {
    let transaction = { id: idTransactionPair[0], ...idTransactionPair[1] };
    accounts.forEach((account) => {
      if (transaction.accountType !== 'Master' && !showBalance) {
        transaction = _.omit(transaction, 'balance');
      }
      if (account.type === transaction.accountType) {
        account.transactions.push(transaction);
      }
    });
  });
  return accounts;
};

export const handleOrderingTransactionsAndCalculatingSummary = ({ accounts, orderedProp }) => {
  accounts.forEach((account) => {
    account.totalAmount = calculateTotalAmountOfTransactions(account.transactions);

    account.totalDepositAmount = calculateTotalDepositAmountOfTransactions(account.transactions);

    account.totalWithdrawalAmount = calculateTotalWithdrawalAmountOfTransactions(account.transactions);

    if (orderedProp) {
      account.transactions.sort((a, b) => {
        if (orderedProp === 'amount') {
          return a[orderedProp] - b[orderedProp];
        }
        if (a[orderedProp] < b[orderedProp]) {
          return -1;
        }
        if (a[orderedProp] > b[orderedProp]) {
          return 1;
        }
        return 0;
      });
    }
  });
  return accounts;
};

export const selectAccounts = createSelector(
  selectFilteredTransactions,
  selectFilteringProps,
  (transactions, filteringProps) => {
    const {
      orderedProp,
      showBalance,
    } = filteringProps;

    let accounts = [
      {
        type: 'Chequing',
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
      {
        type: 'Savings',
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
      {
        type: 'Master',
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
    ];

    accounts = handleAssigningTransactionsAndShowingBalance({
      transactions, accounts, showBalance,
    });

    accounts = handleOrderingTransactionsAndCalculatingSummary({ accounts, orderedProp });
    return accounts;
  },
);

