import { SET_LOAN_DETAILS } from '../actions'; 
const initialState = {
  lender: null,
  loanNumber: null,
  amountPayable: null,
};

const loanDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOAN_DETAILS:
      const { lender, loanNumber, amountPayable } = action.payload;
      return {
        ...state,
        lender,
        loanNumber,
        amountPayable,
      };
    default:
      return state;
  }
};

export default loanDetailsReducer;
