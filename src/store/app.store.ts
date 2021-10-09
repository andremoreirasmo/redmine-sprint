// import { AppDispatch, AppThunk } from './index';
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';
// import { setTimeout } from 'timers';

export interface AppState {
  data: string;
}

const initialState: AppState = {
  data: '',
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // setLocation(state, action: PayloadAction<Location<any>>) {
    //   state.location = action.payload;
    // },
  },
});

// export const { setLocation } = app.actions;
export default app.reducer;

// function sleep(ms: number){
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// export function asyncIncrement(amount: number): AppThunk {
//   return async function (dispatch: AppDispatch) {
//     await sleep(2000);
//     dispatch(increment(amount))
//   }
// }
