import { SET_EMI_AMOUNT } from '../actions';

const initialState = {
  emiAmount: null,
};

const emiReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMI_AMOUNT:
      return {
        ...state,
        emiAmount: action.payload,
      };
    default:
      return state;
  }
};

export default emiReducer;
