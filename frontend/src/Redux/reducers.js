// redux/reducers/authReducer.js
const initialState = {
    user:null,
    error: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
      case 'GET_USER_SUCCESS': 
        return {
          ...state,
          user: action.payload,
          error: null,
        };
      case 'LOGIN_ERROR':
      case 'REGISTER_ERROR':
      case 'GET_USER_ERROR':
        return {
          ...state,
          user: null,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  