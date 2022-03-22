import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  darkMode: boolean;
}

const initialState: AppState = {
  darkMode: localStorage.getItem('dark_mode') === 'true',
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;

      localStorage.setItem('dark_mode', action.payload.toString());
    },
  },
});

export const { setDarkMode } = app.actions;
export default app.reducer;
