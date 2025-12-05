import { createReducer } from "@/fer-framework/fe-base/reducers";
import searchSlice from "@/fer-framework/fe-component/reducers/SearchSlice";
import authSlice from "@/fer-framework/fe-module-auth/reducers";
import { Action } from "@reduxjs/toolkit";

const appRootReducer = createReducer({
  auth: authSlice,
  search: searchSlice,
});

export type RootState = ReturnType<typeof appRootReducer>;

export const reducer = (state: RootState | undefined, action: Action) =>
  appRootReducer(state, action);
