import { PAGE_UPDATE } from './accountActions';

const initialState = {
  transactionCount: 12,
  0: {
    currentPageIndex: 0,
  },
  1: {
    currentPageIndex: 0,
  },
  2: {
    currentPageIndex: 0,
  },
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case PAGE_UPDATE:
      return {
        ...state,
        [payload.accountIndex]: {
          currentPageIndex: payload.currentPageIndex,
        },
      };
    default: return state;
  }
};
