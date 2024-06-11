import { configureStore } from "@reduxjs/toolkit";
import user from "./userStore";
import findjobReducer from "./findjob";
import pageInfoReducer from "./pageInfo";

export const store = configureStore({
  reducer: {
    user: user.reducer,
    findjob: findjobReducer,
    pageInfo: pageInfoReducer,
  },
});
