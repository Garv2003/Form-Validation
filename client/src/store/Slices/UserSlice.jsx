import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router";
const userslice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },

  reducers: {
    login: (state, action) => {
      state.user.push(action.payload);
    },
    logout: (state) => {
      state.user = "";
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userslice.actions;
export default userslice.reducer;
