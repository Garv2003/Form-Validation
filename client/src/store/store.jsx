import { configureStore } from "@reduxjs/toolkit";
import userslice from "./Slices/UserSlice";

const store = configureStore({
  
  reducer: {
    user: userslice,
  },
});

export default store;
