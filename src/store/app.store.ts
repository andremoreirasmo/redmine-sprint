import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isLoadingProcess: boolean;
}

const initialState: AppState = {
  isLoadingProcess: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoadingProcess(state, action: PayloadAction<boolean>) {
      state.isLoadingProcess = action.payload;
    },
  },
});

export const { setIsLoadingProcess } = app.actions;
export default app.reducer;
