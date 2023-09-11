import { createSlice } from '@reduxjs/toolkit';

interface ThemeProps {
  isDarkMode: boolean;
}

const initialState = {
  isDarkMode: false,
} as ThemeProps;

export const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
});
