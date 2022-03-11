import { Redmine } from '@/pages/dashboard/redmine/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  isLoadingProcess: boolean;
  redmines: Redmine[];
}

const initialState: AppState = {
  isLoadingProcess: false,
  redmines: [],
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoadingProcess(state, action: PayloadAction<boolean>) {
      state.isLoadingProcess = action.payload;
    },
    setRedmines(state, action: PayloadAction<Redmine[]>) {
      state.redmines = action.payload;
    },
  },
});

export const { setIsLoadingProcess, setRedmines } = app.actions;
export default app.reducer;
