// store.js
import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import toastReducer from './toastSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    toast: toastReducer,
  },
});

export default store;
