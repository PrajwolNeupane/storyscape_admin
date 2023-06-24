import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  token: string | null;
  loading: boolean;
};

const initialState: InitialState = {
  token: null,
  loading: true,
};

const TokenSlice = createSlice({
  name: "Token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      (state.token = action.payload), (state.loading = false);
    },
  },
});

export default TokenSlice.reducer;
export const { setToken } = TokenSlice.actions;
