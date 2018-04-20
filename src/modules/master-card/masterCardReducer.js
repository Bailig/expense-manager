import { ON_CHANGE_SUCCESS } from './masterCardActions';

const initialState = {
  transactions: null,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case ON_CHANGE_SUCCESS:
      return { transactions: payload };
    default: return state;
  }
};
