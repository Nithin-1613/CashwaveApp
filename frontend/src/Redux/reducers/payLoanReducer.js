import { SET_BUTTON_CLICKED } from '../actions';

const initialState = {
  buttonClicked: null,
};

const payLoanReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUTTON_CLICKED:
      return {
        ...state,
        buttonClicked: action.payload,
      };
    default:
      return state;
  }
};

export default payLoanReducer;
