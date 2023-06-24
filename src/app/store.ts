import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import tokenReducer from "./reducer/tokenReducer";
import authReducer from "./reducer/authReducer";

export const store = configureStore({
  reducer: {
    Token: tokenReducer,
    Auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
