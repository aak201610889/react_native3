// themeSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {lightBlueTheme} from '../constant/theme'
const initialState = {
  themeColor: lightBlueTheme, // Default theme color
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeColor: (state, action) => {
      console.log(state);
      
      state.themeColor = action.payload;
    },
  },
});

export const {setThemeColor} = themeSlice.actions;
export const selectThemeColor = (state: any) => state.theme.themeColor;

export default themeSlice.reducer;
