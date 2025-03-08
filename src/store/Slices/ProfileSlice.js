import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../helpers/Api.js";

const initialState = {
  UserProfile: null,
  isLoading: false,
  status: false,
};

// Async thunk to getting user profile
export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/v1/ecommerce/profile");
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching profile");
      return rejectWithValue(error.response?.data);
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (updatedProfile, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/api/v1/ecommerce/profile",
        updatedProfile
      );
      toast.success(
        response?.data?.message || "Your profile updated successfullyy"
      );
      return response.data.data;
    } catch (error) {
      console.log("Error", error);
      toast.error(error.response?.data?.message || "Profile update failed");
      return rejectWithValue(error.response?.data);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfileStatus: (state) => {
      state.isProfileUpdated = false;
      state.profileUpdateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.status = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = true;
        state.UserProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state) => {
        state.isLoading = false;
        state.status = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.UserProfile = action.payload;
        state.status = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.status = false;
      });
  },
});

export const { resetProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;
