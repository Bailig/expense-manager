import { UPDATE } from './filteringFormActions';

const initialState = {
  searchKeyWord: '',
  startDate: '',
  endDate: '',
  orderedProp: '',
  showDeposit: true,
  showWithdrawal: true,
  showBalance: true,
};

export default (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE:
      return { ...state, [payload.prop]: payload.value };
    default: return state;
  }
};
