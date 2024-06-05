import { configureStore } from "@reduxjs/toolkit";
import findjobReducer from "./findjob";

export const store = configureStore({
  reducer: {
    findjob: findjobReducer,
  },
});
