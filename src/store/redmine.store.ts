import { Redmine } from '@/pages/dashboard/redmine/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RedmineState {
  redmines: Redmine[];
  redmineSelected: Redmine | null;
  isLoadingRedmine: boolean;
}

function getInitialState(): RedmineState {
  const redmineSelectedStorage = localStorage.getItem('redmine_selected');
  const redmineSelected = redmineSelectedStorage
    ? (JSON.parse(redmineSelectedStorage) as Redmine)
    : null;

  const initialState: RedmineState = {
    redmines: [],
    redmineSelected: redmineSelected,
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
    setRedmineSelected(state, action: PayloadAction<Redmine | null>) {
      state.redmineSelected = action.payload;

      if (action.payload) {
        localStorage.setItem(
          'redmine_selected',
          JSON.stringify(action.payload),
        );
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
