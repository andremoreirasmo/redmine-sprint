import { User } from './../pages/auth/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      { payload: { user, token } }: PayloadAction<Omit<AuthState, 'isLoading'>>,
    ) => {
      state.user = user;
      state.token = token;

      localStorage.setItem('token', token as string);
    },
    logout: state => {
      state.user = null;
      state.token = null;

      localStorage.removeItem('token');
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
