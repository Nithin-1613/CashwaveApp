import { SET_SELECTED_LENDER } from "../actions";

const initialState = {
  selectedLender: null,
};

const lendersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_LENDER:
      return {
        ...state,
        selectedLender: action.payload,
      };
    default:
      return state;
  }
};

export default lendersReducer;
