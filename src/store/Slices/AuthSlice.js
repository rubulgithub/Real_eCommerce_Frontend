import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../helpers/Api.js";

const initialState = {
  user: null,
  status: false,
  isLoading: false,
};

// Async thunk to handle the signup
export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, username, password, confirmPassword, role }) => {
    try {
      const response = await axiosInstance.post("/users/register", {
        email,
        username,
        password,
        confirmPassword,
      });
      toast.success(
        "Verification email has been sent. Please check your inbox."
      );
      // console.log("Store response", response);
      // console.log("data response", response.data);
      return response.data.user;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to register. Please try again later."
      );
      return rejectWithValue(error.response?.data);
    }
  }
);

// Async thunk to handle the Login

export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const response = await axiosInstance.post("/users/login", data);

    const { user } = response.data.data;
    console.log("data", user);
    toast.success("Logged in successfully");
    return user;
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message || "Login failed");
  }
});

export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/users/logout");

    const { user } = response.data.data;
    console.log("data", user);
    toast.success("Log out successfully");
    return user;
  } catch (error) {
    console.log("error", error);
    console.log("logout error", error);
    toast.error(error?.response?.data?.message || "Logout failed");
  }
});

// Current user
export const currentUser = createAsyncThunk(
  "currentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/current-user");
      const currentUser = response.data.data;
      console.log("current user", currentUser);
      toast.success("Welcome Back!");
      return currentUser;
    } catch (error) {
      console.log("error", error);
      toast.error("Please log in again");
      return rejectWithValue(error.response?.data); // Reject properly
    }
  }
);

// Revalidate user
export const revalidateUser = createAsyncThunk(
  "auth/revalidateUser",
  async (_, { dispatch }) => {
    try {
      // Reuse currentUser logic
      await dispatch(currentUser());
    } catch {
      // Optional: Handle cases where revalidation fails
      console.error("User revalidation failed");
    }
  }
);
// Async thunk to handle email verification
export const verifyEmail = createAsyncThunk("verifyEmail", async (token) => {
  try {
    const response = await axiosInstance.get(`/verify-email/${token}`);
    toast.success("Your email has been verified!");
    console.log("email verify response", response);
    return response.data;
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to verify email. Please try again."
    );
    return rejectWithValue(error.response?.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.status = true;
      })
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.status = false;
      })
      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.status = true;
      })
      .addCase(currentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.status = false;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
