import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userStore";
import findjobReducer from "./findjob";
import pageInfoReducer from "./pageInfo";

export const store = configureStore({
  reducer: {
    user: userReducer,
    findjob: findjobReducer,
    pageInfo: pageInfoReducer,
  },
});
