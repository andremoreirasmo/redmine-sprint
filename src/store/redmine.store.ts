import { Redmine } from '@/pages/dashboard/redmine/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RedmineState {
  redmines: Redmine[];
  redmineSelectedId: string;
  isLoadingRedmine: boolean;
}

function getInitialState(): RedmineState {
  const redmineSelected = localStorage.getItem('redmine_selected') ?? '';

  const initialState: RedmineState = {
    redmines: [],
    redmineSelectedId: redmineSelected,
    isLoadingRedmine: false,
  };

  return initialState;
}

const initialState = getInitialState();

const redmine = createSlice({
  name: 'redmine',
  initialState,
  reducers: {
    setRedmines(state, action: PayloadAction<Redmine[]>) {
      state.redmines = action.payload;
    },
    setRedmineSelected(state, action: PayloadAction<string | null>) {
      state.redmineSelectedId = action.payload ?? '';

      if (action.payload) {
        localStorage.setItem('redmine_selected', action.payload);
      } else {
        localStorage.removeItem('redmine_selected');
      }
    },
    setIsLoadingRedmine(state, action: PayloadAction<boolean>) {
      state.isLoadingRedmine = action.payload;
    },
  },
});

export const { setRedmines, setRedmineSelected, setIsLoadingRedmine } =
  redmine.actions;
export default redmine.reducer;
