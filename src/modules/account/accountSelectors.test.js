import { Selector } from 'redux-testkit';
import * as uut from './accountSelectors';

describe('account selectors', () => {
  const state = {
    transaction: {
      transactions: {
        1: {
          accountType: 'Chequing',
          amount: 45,
          balance: 996.1,
          code: 'CW',
          description: 'INTERAC E-TRANSFER RECEIVED 20161652119E9FAD7',
          transactionDate: '2016-06-13',
        },
        2: {
          accountType: 'Chequing',
          amount: -149.17,
          balance: 571.72,
          code: 'CW',
          description: 'BMO MASTERCARD',
          transactionDate: '2016-06-27',
        },
      },
    },
    filteringForm: {
      searchKeyword: '',
      startDate: '',
      endDate: '',
      orderedProp: 'description',
      showDeposit: true,
      showWithdrawal: true,
      showBalance: false,
    },
  };

  describe('selectAccounts()', () => {
    it('should select select accounts with its transactions', () => {
      const result = [
        {
          type: 'Chequing',
          transactions: [{
            id: '2',
            accountType: 'Chequing',
            amount: -149.17,
            code: 'CW',
            description: 'BMO MASTERCARD',
            transactionDate: '2016-06-27',
          }, {
            id: '1',
            accountType: 'Chequing',
            amount: 45,
            code: 'CW',
            description: 'INTERAC E-TRANSFER RECEIVED 20161652119E9FAD7',
            transactionDate: '2016-06-13',
          }],
        },
        { type: 'Savings', transactions: [] },
        { type: 'Master', transactions: [] },
      ];
      Selector(uut.selectAccounts).expect(state).toReturn(result);
    });
  });
});
