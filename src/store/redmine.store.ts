import { Redmine } from '@/pages/dashboard/redmine/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RedmineState {
  redmines: Redmine[];
  redmineSelected: Redmine | null;
  isLoadingRedmine: boolean;
}

const initialState: RedmineState = {
  redmines: [],
  redmineSelected: null,
  isLoadingRedmine: false,
};

const redmine = createSlice({
  name: 'redmine',
  initialState,
  reducers: {
    setRedmines(state, action: PayloadAction<Redmine[]>) {
      state.redmines = action.payload;
    },
    setRedmineSelected(state, action: PayloadAction<Redmine | null>) {
      state.redmineSelected = action.payload;
    },
    setIsLoadingRedmine(state, action: PayloadAction<boolean>) {
      state.isLoadingRedmine = action.payload;
    },
  },
});

export const { setRedmines, setRedmineSelected, setIsLoadingRedmine } =
  redmine.actions;
export default redmine.reducer;
