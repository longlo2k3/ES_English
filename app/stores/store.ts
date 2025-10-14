import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { baseApi } from "@/fer-framework/fe-base/apis";

export const reduxStore = configureStore({
  reducer: rootReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(baseApi.middleware);
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;

export type AppDispatch = typeof reduxStore.dispatch;
