import _ from 'lodash';
import { createSelector } from 'reselect';

import { selectFilteredTransactions } from '../transaction';
import { selectFilteringProps } from '../filteringForm';


export const selectAccounts = createSelector(
  selectFilteredTransactions,
  selectFilteringProps,
  (transactions, filteringProps) => {
    const {
      orderedProp,
      showBalance,
    } = filteringProps;
    const accounts = [
      { type: 'Chequing', transactions: [] },
      { type: 'Savings', transactions: [] },
      { type: 'Master', transactions: [] },
    ];
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
    if (orderedProp) {
      accounts.forEach((account) => {
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
      });
    }
    return accounts;
  },
);

