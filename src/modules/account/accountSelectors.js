import { createSelector } from 'reselect';

import { selectTransactions } from '../transaction';


export const selectAccounts = createSelector(
  selectTransactions,
  (transactions) => {
    const accounts = [
      { type: 'Chequing', transactions: [] },
      { type: 'Savings', transactions: [] },
      { type: 'Master Card', transactions: [] },
    ];
    if (!transactions) return accounts;
    Object.entries(transactions).forEach((idTransactionPair) => {
      const transaction = idTransactionPair[1];
      accounts.forEach((account) => {
        if (account.type === transaction.accountType) {
          accounts.transactions = [...account.transactions, transaction];
        }
      });
    });
    return accounts;
  },
);
