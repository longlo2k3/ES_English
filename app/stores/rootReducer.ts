import { combineReducers } from "@reduxjs/toolkit";

// Import các slice

const rootReducer = combineReducers({
  //...
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
