import { AppDispatch, AppThunk } from './index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setTimeout } from 'timers';

const stock = createSlice({
  name: 'stock',
  initialState: {
    counter: 0
  },
  reducers: {
    
    increment(state, action: PayloadAction<number>) {
      state.counter += action.payload;
    },

    decrement(state) {
      state.counter -= 1;
    }
    
  }
});

export const { decrement, increment } = stock.actions;
export default stock.reducer;

function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function asyncIncrement(amount: number): AppThunk {
  return async function (dispatch: AppDispatch) {
    await sleep(2000);
    dispatch(increment(amount))
  } 
}