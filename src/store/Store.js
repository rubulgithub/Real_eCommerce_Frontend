import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import authReducer from "./Slices/AuthSlice.js";

// Redux Persist Config
const persistConfig = {
  key: "auth", // Key in storage
  storage, // Default storage mechanism
  whitelist: ["status", "user"], // Persist only these keys
};

// Create a persisted reducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the store
const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store); // Create a persistor instance
export default store;
