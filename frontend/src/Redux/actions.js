// actions.js
import axios from "axios";
export const linkAccountSuccess = (policyData) => {
  return {
    type: 'LINKACCOUNT_SUCCESS',
    payload: policyData,
  };
};

export const linkAccountFail = (error) => {
  return {
    type: 'LINKACCOUNT_FAIL',
    payload: error,
  };
};

export const policyLoginSuccess = (policyData) => {
  return {
    type: 'POLICYLOGIN_SUCCESS',
    payload: policyData,
  };
};
export const getPolicySuccess = (policyData) => ({
  type: 'GET_POLICY_SUCCESS',
  payload: policyData,
});

export const getPolicyError = (error) => ({
  type: 'GET_POLICY_ERROR',
  payload: error,
});

export const fetchPolicyData = (policynumber) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/policies?policynumber=${policynumber}`);
      const policyData = response.data;
      
      if (policyData) {
        dispatch(getPolicySuccess(policyData));
      } else {
        dispatch(getPolicyError('Failed to fetch policy.'));
      }
    } catch (error) {
      dispatch(getPolicyError(error));
    }
  };
};

// export const getPoliciesSuccess = (policies) => {
//   return {
//     type: 'GET_POLICIES_SUCCESS',
//     payload: policies,
//   };
// };

// export const getPoliciesFail = (error) => {
//   return {
//     type: 'GET_POLICIES_FAIL',
//     payload: error,
//   };
// };
export const SET_BUTTON_CLICKED = 'SET_BUTTON_CLICKED';
export const SET_SELECTED_LENDER = 'SET_SELECTED_LENDER';
export const SET_LOAN_DETAILS = 'SET_LOAN_DETAILS';
export const SET_EMI_AMOUNT = 'SET_EMI_AMOUNT';

export const setButtonClicked = (buttonName) => ({
  type: SET_BUTTON_CLICKED,
  payload: buttonName,
});

export const setSelectedLender = (lender) => ({
  type: SET_SELECTED_LENDER,
  payload: lender,
});

export const setLoanDetails = (lender, loanNumber, amountPayable) => ({
  type: SET_LOAN_DETAILS,
  payload: { lender, loanNumber, amountPayable },
});

export const setEmiAmount = (emiAmount) => ({
  type: SET_EMI_AMOUNT,
  payload: emiAmount,
});


