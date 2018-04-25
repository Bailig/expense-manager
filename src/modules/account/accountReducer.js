import { UPDATE } from './accountActions';

const initialState = {
  accounts: {
    0: {
      index: 0,
      type: 'Chequing',
      currentPageNumber: 1,
      pageNumbers: [1, 2, 3, 4, 5],
    },
    1: {
      index: 1,
      type: 'Savings',
      currentPageNumber: 1,
      pageNumbers: [1, 2, 3, 4, 5],
    },
    2: {
      index: 2,
      type: 'Master',
      currentPageNumber: 1,
      pageNumbers: [1, 2, 3, 4, 5],
    },
  },
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE:
      return {
        accounts: {
          ...state.accounts,
          [payload.accountIndex]: {
            ...state.accounts[payload.accountIndex], currentPageNumber: payload.currentPageNumber,
          },
        },
      };
    default: return state;
  }
};
