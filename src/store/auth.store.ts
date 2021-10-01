import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

export type AuthState = {
  user: User | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload: { user, token } }: PayloadAction<AuthState>) => {
      state.user = user;
      state.token = token;

      localStorage.setItem("token", token ?? "");
    },
    logout: (state, { payload }: PayloadAction<any>) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
