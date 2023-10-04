// reducer.js
// In your reducer.js

const initialState = {
  policies: [], // Initialize policies as an empty array
  errormsg: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LINKACCOUNT_SUCCESS':
    case 'POLICYLOGIN_SUCCESS':
      return {
        ...state,
        policies: [...state.policies, action.payload], // Add the new policy to the existing array
      };
    case 'LINKACCOUNT_FAIL':
      return {
        ...state,
        errormsg: action.payload,
      };
    case 'GET_POLICY_SUCCESS':
      return {
        ...state,
        policies: action.payload, // Update policies with the new array of policies
        error: null,
      };
    case 'GET_POLICY_ERROR':
      return {
        ...state,
        policies: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
