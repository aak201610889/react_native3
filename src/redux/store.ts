// store.js
import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import toastReducer from './toastSlice';
import OrderReducer from './OrderSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    toast: toastReducer,
    order: OrderReducer,
  },
});

export default store;
