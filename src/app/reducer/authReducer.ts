import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "../../Interface/index.ts";

type InitialState = {
  auth: {
    email: string;
    isCreater: boolean;
    name: string;
    photoURL: string;
  } | null;
};

const initialState: InitialState = {
  auth: null,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthResponse>) => {
      state.auth = action.payload;
    },
  },
});

export default AuthSlice.reducer;
export const { setAuth } = AuthSlice.actions;
