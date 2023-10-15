import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      state.user = [];
    },
  },
});

export const { login, logout } = userslice.actions;
export default userslice.reducer;
