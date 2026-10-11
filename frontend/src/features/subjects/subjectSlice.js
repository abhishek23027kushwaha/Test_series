import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchSubjects = createAsyncThunk('subjects/fetch', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/subjects');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load subjects');
  }
});

const subjectSlice = createSlice({
  name: 'subjects',
  initialState: { items: [], isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default subjectSlice.reducer;
