import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const storedUser = localStorage.getItem('user');

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
  securityQuestion: null,
  message: null,
};

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/register', data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/login', data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const fetchSecurityQuestion = createAsyncThunk('auth/securityQuestion', async (email, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/forgot-password/question', { email });
    return res.data.securityQuestion;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Could not find account');
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/auth/forgot-password/reset', data);
    return res.data.message;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Reset failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearAuthError: (state) => {
      state.error = null;
      state.message = null;
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchSecurityQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.securityQuestion = null;
      })
      .addCase(fetchSecurityQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.securityQuestion = action.payload;
      })
      .addCase(fetchSecurityQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
