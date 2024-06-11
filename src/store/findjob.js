import { createSlice } from "@reduxjs/toolkit";

const findjobSlice = createSlice({
  name: "findjob",
  initialState: {
    cateType: "",
  },
  reducers: {
    setCateType: (state, action) => {
      state.cateType = action.payload.cateType;
    },
  },
});

export const { setCateType } = findjobSlice.actions;
export default findjobSlice.reducer;
