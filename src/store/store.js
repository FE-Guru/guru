import { configureStore } from "@reduxjs/toolkit";
import user from "./userStore";
import findjobReducer from "./findjob";

export const store = configureStore({
  reducer: {
    user: user.reducer,
    findjob: findjobReducer,
  },
});
