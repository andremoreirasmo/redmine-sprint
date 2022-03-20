import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isLoadingProcess: boolean;
  darkMode: boolean;
}

const initialState: AppState = {
  isLoadingProcess: false,
  darkMode: localStorage.getItem('dark_mode') === 'true',
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoadingProcess(state, action: PayloadAction<boolean>) {
      state.isLoadingProcess = action.payload;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.darkMode = action.payload;

      localStorage.setItem('dark_mode', action.payload.toString());
    },
  },
});

export const { setIsLoadingProcess, setDarkMode } = app.actions;
export default app.reducer;
