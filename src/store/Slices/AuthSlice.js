import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../helpers/Api.js";

const initialState = {
  user: null,
  users: [],
  totalUsers: 0,
  status: false,
  isLoading: false,
  userStats: null,
};
// Async thunk to handle the signup
export const registerUser = createAsyncThunk(
  "registerUser",
  async ({ email, username, password, confirmPassword, role }) => {
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
    const { user } = response.data.data;
    toast.success("Logged in successfully");
    return user;
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message || "Login failed");
  }
});

export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/api/v1/users/logout");

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
      const response = await axiosInstance.get("/api/v1/users/current-user");
      const currentUser = response.data.data;
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
      await dispatch(currentUser());
    } catch {
      console.error("User revalidation failed");
    }
  }
);

// Async thunk to handle email verification
export const verifyEmail = createAsyncThunk("verifyEmail", async (token) => {
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
});

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async ({ page = 1, limit = 10, search = "" }, { rejectWithValue }) => {
    try {
      // Ensure search is a string
      const searchQuery = typeof search === "string" ? search : "";
      const response = await axiosInstance.get(
        `/api/v1/users/admin/users?page=${page}&limit=${limit}&search=${searchQuery}`
      );
      console.log("All user:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  "updateUserRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      // // Ensure userId and role are strings
      // const validUserId =
      //   typeof userId === "string" ? userId : userId.toString();
      // const validRole = typeof role === "string" ? role : role.toString();

      const response = await axiosInstance.patch(
        `/api/v1/users/admin/users/${userId}`,
        { role: role }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  "auth/fetchUserStats",
  async (period = "7d", { rejectWithValue }) => {
    try {
      // Ensure period is a string
      const validPeriod = typeof period === "string" ? period : "7d";
      const response = await axiosInstance.get(
        `/api/v1/users/admin/users/stats?period=${validPeriod}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

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
      })

      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data?.users) {
          state.users = action.payload.data.users;
        }
        if (action.payload?.data?.totalUsers) {
          state.totalUsers = action.payload.data.totalUsers;
        }
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const { userId, role } = action.meta.arg;
        if (state.user?._id === userId) {
          state.user.role = role;
        }
      })
      .addCase(fetchUserStats.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload?.data) {
          state.userStats = action.payload.data;
        }
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
