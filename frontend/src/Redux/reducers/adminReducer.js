const initialState = {
    userid: null, // Initialize users as an empty array
  };
  
  const adminReducer = (state = initialState, action) => {
  
    switch (action.type) {
      
     case 'SET_ID':
        return {
          ...state,
          userid: action.payload, // Add the new user to the existing array
        };
  
      default:
        return state;
    }
  };
  
  export default adminReducer;
  