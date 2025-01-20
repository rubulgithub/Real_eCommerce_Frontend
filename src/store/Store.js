// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
