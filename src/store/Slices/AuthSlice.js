import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../helpers/Api.js";

// Async thunk to handle the signup
export const registerUser = createAsyncThunk(
  "registerUser",
  async (
    { email, username, password, confirmPassword, role },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/api/v1/users/register", {
        email,
        username,
        password,
        confirmPassword,
      });
      toast.success(
        "Verification email has been sent. Please check your inbox."
      );
      console.log("Store response", response);
      console.log("data response", response.data);
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
    const response = await axiosInstance.post("/api/v1/users/login", data);
    toast.success("Logged in successfully");
    return response.data.data.user;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

// Async thunk to handle email verification
export const verifyEmail = createAsyncThunk(
  "verifyEmail",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify-email/${token}`);
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
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
