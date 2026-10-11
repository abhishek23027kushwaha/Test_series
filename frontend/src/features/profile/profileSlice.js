import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const updateProfile = createAsyncThunk('profile/update', async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.put('/profile', data);
    return res.data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update profile');
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: { isLoading: false, error: null, success: false },
  reducers: {
    clearProfileStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProfileStatus } = profileSlice.actions;
export default profileSlice.reducer;
