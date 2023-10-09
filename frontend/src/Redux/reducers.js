// redux/reducers/authReducer.js
import {
  INITIATE_PASSWORD_RESET_SUCCESS,
  INITIATE_PASSWORD_RESET_FAILURE,
} from './actions1';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    user:user||null,
    message:null,
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
        case INITIATE_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        message: action.message,
        error: null,
      };
    case INITIATE_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        message: null,
        error: action.error,
      };
      default:
        return state;
    }
  };
  
  export default authReducer;
  