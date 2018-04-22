import { Selector } from 'redux-testkit';
import * as uut from './transactionSelectors';

describe('transaction selectors', () => {
  const state = {
    transaction: {
      transactions: {
        1: {
          accountType: 'Savings',
          amount: -1050,
          balance: 458.13,
          code: 'CW',
          description: 'TF 2442#3945-758',
          transactionDate: '2016-06-27',
        },
        2: {
          accountType: 'Chequing',
          amount: 45,
          balance: 996.1,
          code: 'CW',
          description: 'INTERAC E-TRANSFER RECEIVED 20161652119E9FAD7',
          transactionDate: '2016-06-13',
        },
        3: {
          accountType: 'Master',
          amount: -45,
          description: 'KOODO AIRTIME SCARBOROUGH ON',
          transactionDate: '2016-06-13',
          postingDate: '2016-06-07',
        },
      },
    },
    filteringForm: {
      searchKeyword: 'kood',
      startDate: '2016-06-01',
      endDate: '2018-06-25',
      orderedProp: 'amount',
      showDeposit: true,
      showWithdrawal: true,
      showBalance: true,
    },
  };

  describe('selectFilteredTransactions()', () => {
    it('should select select filtered transactions from transaction state', () => {
      const result = {
        3: {
          accountType: 'Master',
          amount: -45,
          description: 'KOODO AIRTIME SCARBOROUGH ON',
          transactionDate: '2016-06-13',
          postingDate: '2016-06-07',
        },
      };
      Selector(uut.selectFilteredTransactions).expect(state).toReturn(result);
    });
  });
});
