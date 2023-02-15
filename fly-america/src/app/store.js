import { configureStore } from "@reduxjs/toolkit";
import shoeReducer from "../features/shoes/shoeSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    shoes: shoeReducer,
    auth: authReducer,
  },
});
