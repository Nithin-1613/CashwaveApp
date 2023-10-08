// redux/actions/authActions.js
import axios from 'axios';

export const login = (userData) => {
    // Implement your login logic here (e.g., API call)
    return (dispatch) => {
      // Simulated login for demonstration
      
        dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
        console.log('LOGIN_SUCCESS dispatched with data:', userData);
    }
  };
  
  export const register = (userData) => {
    // Implement your registration logic here (e.g., API call)
    return (dispatch) => {
      // Simulated registration for demonstration
     
        dispatch({ type: 'REGISTER_SUCCESS', payload: userData });
      
    };
  };
  export const fetchUser = (userData) => {
    return{
  
    type: 'GET_USER_SUCCESS', 
    payload: userData,
    };
    };
    
  export const fetchUserfail = (error) => {
      return{
    
      type: 'GET_USER_ERROR', 
      payload: error,
      };
      };
  
      export const fetchUserData = (emailid, security_PIN) => {
        return async (dispatch) => {
          try {
            console.log('Fetching user data...'); // Add this line for debugging
            console.log(emailid,security_PIN);
      
            // Make an API call to authenticate the user based on email and password
            
              
            const response = await axios.post('http://localhost:8081/users/login',{emailid:emailid,security_PIN:security_PIN,});
          
            
            console.log(response);
            if (response.status === 200) {
              const userData = response.data; // Assuming email is unique, so we take the first user
            
            if (userData) {
              // If user is authenticated, dispatch the user data
              console.log(userData);
              dispatch(fetchUser(userData));

            } else {
              // If authentication fails, you can dispatch an error action
              dispatch(fetchUserfail('Authentication failed.'));
            }
          } else {
            // Handle non-200 status codes as errors
            dispatch(fetchUserfail('Authentication failed. Please try again later.'));
          }
        }catch (error) {
            // Handle error or dispatch an error action if needed
            dispatch(fetchUserfail(error));
          }
        };
      };
  
  