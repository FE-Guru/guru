import { createSlice } from "@reduxjs/toolkit";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return {
    date: `${year}. ${month}. ${day}`,
    time: `${hours}:${minutes}`,
  };
};
const calculateDFormat = (endDate) => {
  const today = new Date();
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `D-${diffDays}`;
  } else if (diffDays === 0) {
    return "D-Day";
  } else {
    return `D+${Math.abs(diffDays)}`;
  }
};

const findjobSlice = createSlice({
  name: "findjob",
  initialState: {
    cateType: "",
    workStartDate: { date: "", time: "" },
    workEndDate: { date: "", time: "" },
    endDate: { date: "", time: "" },
    dFormat: "",
  },
  reducers: {
    setCateType: (state, action) => {
      state.cateType = action.payload.cateType;
    },
    setDates: (state, action) => {
      const { workStartDate, workEndDate, endDate } = action.payload;
      state.workStartDate = formatDate(new Date(workStartDate));
      state.workEndDate = formatDate(new Date(workEndDate));
      state.endDate = formatDate(new Date(endDate));
      state.dFormat = calculateDFormat(new Date(endDate));
    },
  },
});

export const { setCateType, setDates } = findjobSlice.actions;
export default findjobSlice.reducer;
