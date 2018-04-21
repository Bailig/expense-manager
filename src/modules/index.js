import { combineReducers } from 'redux';
import transaction from './transaction';
import filteringForm from './filteringForm';

const rootReducer = combineReducers({ transaction, filteringForm });
export default rootReducer;
