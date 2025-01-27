import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    toggleStatus: "idle",
    toggleError: null,
    isToggle: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isToggle = !state.isToggle;
    },
  },
});

export default toggleSlice.reducer;
export const { toggleSidebar } = toggleSlice.actions;
