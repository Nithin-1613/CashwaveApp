import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers';
import thunk from 'redux-thunk';
//import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunk]
});

export default store;
