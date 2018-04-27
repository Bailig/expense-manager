import _ from 'lodash';
import { createSelector } from 'reselect';

import {
  selectFilteredTransactions,
  calculateTotalAmountOfTransactions,
  calculateTotalDepositAmountOfTransactions,
  calculateTotalWithdrawalAmountOfTransactions,
} from '../transaction';
import { selectFilteringProps } from '../filteringForm';

const selectAccount = state => state.account;

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

const groupTransactions = ({ transactions, transactionCount }) => {
  const groupedTransactions = [];
  let i;
  let j;
  for (i = 0, j = transactions.length; i < j; i += transactionCount) {
    groupedTransactions.push(transactions.slice(i, i + transactionCount));
  }
  return groupedTransactions;
};

export const handleOrderingGroupingAndCalculatingSummary = ({ accounts, orderedProp, transactionCount }) => {
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
    account.transactions = groupTransactions({ transactions: account.transactions, transactionCount });
    account.pageCount = account.transactions.length;
    if (account.currentPageIndex > account.pageCount) {
      account.currentPageIndex = 0;
    }
  });
  return accounts;
};

export const selectAccounts = createSelector(
  selectFilteredTransactions,
  selectFilteringProps,
  selectAccount,
  (transactions, filteringProps, account) => {
    const {
      orderedProp,
      showBalance,
    } = filteringProps;

    let accounts = [
      {
        ...account[0],
        type: 'Chequing',
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
      {
        ...account[1],
        type: 'Savings',
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
      {
        ...account[2],
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
    const { transactionCount } = account;
    accounts = handleOrderingGroupingAndCalculatingSummary({ accounts, orderedProp, transactionCount });
    return accounts;
  },
);

