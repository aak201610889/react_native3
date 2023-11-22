// toastSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  type: null,
  text1: '',
  text2: '',
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      console.log(state);
      
      return {...state, ...action.payload};
    },
    clearToast: state => {
      return initialState;
    },
  },
});

export const {showToast, clearToast} = toastSlice.actions;

export default toastSlice.reducer;
