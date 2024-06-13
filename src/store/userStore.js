import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    userState: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userState } = user.actions;
export default user;
