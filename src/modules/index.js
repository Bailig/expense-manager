import { combineReducers } from 'redux';
import transaction from './transaction';
import filteringForm from './filteringForm';
import account from './account';

const rootReducer = combineReducers({ transaction, filteringForm, account });
export default rootReducer;
