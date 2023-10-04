import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; 
import logger from 'redux-logger';
import reducer from './reducer';
import payLoanReducer from './reducers/payLoanReducer';
import lendersReducer from './reducers/lendersReducer';
import loanDetailsReducer from './reducers/loanDetailsReducer';
import emiReducer from './reducers/emiReducer';

const rootReducer = combineReducers({
  payLoan: payLoanReducer,
  lenders: lendersReducer,
  loanDetails: loanDetailsReducer,
  emi: emiReducer,
  reducer: reducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
