import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosInstance } from "../../helpers/Api.js";

const initialState = {
  UserProfile: null,
  isLoading: false,
  isProfileUpdated: false,
  profileUpdateError: null,
  status: false,
};

// Async thunk to getting user profile
export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ecommerce/profile");
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
        "/ecommerce/profile",
        updatedProfile
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
        state.isProfileUpdated = true;
        state.profileUpdateError = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isProfileUpdated = false;
        state.profileUpdateError = action.payload;
      });
  },
});

export const { resetProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;
