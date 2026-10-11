import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const startTest = createAsyncThunk('mockTest/start', async ({ subject, count }, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/mocktest/start', { params: { subject, count } });
    return { questions: res.data, subject };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to start test');
  }
});

// payload: { subject, durationMinutes, answers: [{ questionId, selectedOption }] }
export const submitTest = createAsyncThunk('mockTest/submit', async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/mocktest/submit', data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to submit test');
  }
});

export const fetchResultHistory = createAsyncThunk('mockTest/history', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/mocktest/results');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load history');
  }
});

export const fetchResultDetail = createAsyncThunk('mockTest/resultDetail', async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/mocktest/results/${id}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load result');
  }
});

const mockTestSlice = createSlice({
  name: 'mockTest',
  initialState: {
    questions: [],
    subject: null,
    isLoading: false,
    error: null,
    result: null,
    history: [],
    isHistoryLoading: false,
    isDetailLoading: false,
  },
  reducers: {
    resetTest: (state) => {
      state.questions = [];
      state.subject = null;
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startTest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(startTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload.questions;
        state.subject = action.payload.subject;
      })
      .addCase(startTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(submitTest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitTest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.result = action.payload;
      })
      .addCase(submitTest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchResultHistory.pending, (state) => {
        state.isHistoryLoading = true;
      })
      .addCase(fetchResultHistory.fulfilled, (state, action) => {
        state.isHistoryLoading = false;
        state.history = action.payload;
      })
      .addCase(fetchResultHistory.rejected, (state) => {
        state.isHistoryLoading = false;
      })
      .addCase(fetchResultDetail.pending, (state) => {
        state.isDetailLoading = true;
      })
      .addCase(fetchResultDetail.fulfilled, (state, action) => {
        state.isDetailLoading = false;
        state.result = action.payload;
      })
      .addCase(fetchResultDetail.rejected, (state, action) => {
        state.isDetailLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTest } = mockTestSlice.actions;
export default mockTestSlice.reducer;
