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

const handleShowingBalance = ({ transaction, showBalance }) => {
  if (showBalance || transaction.accountType === 'Master') {
    return transaction;
  }
  return _.omit(transaction, 'balance');
};

const handleGroupingTransactionsByCountPerPage = ({
  transactions,
  count = 20,
}) => {
  const groupedTransactions = [];
  let i;
  let j;
  for (i = 0, j = transactions.length; i < j; i += count) {
    groupedTransactions.push(transactions.slice(i, i + count));
  }
  return groupedTransactions;
};

export const handleAssigningTransactionsAndShowingBalance = ({
  transactions = [],
  accounts,
  showBalance = true,
}) => {
  if (!transactions) return accounts;
  Object.entries(transactions).forEach((idTransactionPair) => {
    let transaction = { id: idTransactionPair[0], ...idTransactionPair[1] };
    accounts.forEach((account) => {
      transaction = handleShowingBalance({ transaction, showBalance });
      if (account.type === transaction.accountType) {
        account.transactions.push(transaction);
      }
    });
  });
  return accounts;
};

export const handleOrderingGroupingTransactionsAndCalculatingSummary = ({ accounts, orderedProp }) => {
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
    account.transactions = handleGroupingTransactionsByCountPerPage({ transactions: account.transactions });
    account.getLastPageNumber = () => (account.transactions.length + 1);
  });
  return accounts;
};

export const selectAccounts = createSelector(
  selectAccount,
  selectFilteredTransactions,
  selectFilteringProps,
  (account, transactions, filteringProps) => {
    let accounts = [
      {
        ...account.accounts[0],
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
      {
        ...account.accounts[1],
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
      {
        ...account.accounts[2],
        totalAmount: 0,
        totalDepositAmount: 0,
        totalWithdrawalAmount: 0,
        transactions: [],
      },
    ];

    const {
      orderedProp,
      showBalance,
    } = filteringProps;

    accounts = handleAssigningTransactionsAndShowingBalance({
      transactions, accounts, showBalance,
    });

    accounts = handleOrderingGroupingTransactionsAndCalculatingSummary({ accounts, orderedProp });
    return accounts;
  },
);

