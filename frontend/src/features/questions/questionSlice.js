import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const fetchQuestions = createAsyncThunk('questions/fetch', async (params, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/questions', { params });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load questions');
  }
});

export const createQuestion = createAsyncThunk('questions/create', async (data, thunkAPI) => {
  try {
    const res = await axiosInstance.post('/questions', data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create question');
  }
});

export const updateQuestion = createAsyncThunk('questions/update', async ({ id, data }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/questions/${id}`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update question');
  }
});

export const deleteQuestion = createAsyncThunk('questions/delete', async (id, thunkAPI) => {
  try {
    await axiosInstance.delete(`/questions/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete question');
  }
});

export const toggleSolved = createAsyncThunk('questions/toggleSolved', async (id, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/questions/${id}/solve`);
    return { id, solved: res.data.solved };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update question');
  }
});

export const fetchBookmarks = createAsyncThunk('questions/fetchBookmarks', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/bookmarks');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to load bookmarks');
  }
});

// Accepts the full question object so the Bookmarks page can be updated
// instantly, without a second round-trip to the server.
export const toggleBookmark = createAsyncThunk('questions/toggleBookmark', async (question, thunkAPI) => {
  try {
    const id = typeof question === 'string' ? question : question._id;
    const res = await axiosInstance.post(`/bookmarks/${id}`);
    const state = thunkAPI.getState();
    const fullQuestion =
      (typeof question === 'object' && question) ||
      state.questions.items.find((q) => q._id === id) ||
      state.questions.bookmarkedQuestions.find((q) => q._id === id) || { _id: id };
    return { question: fullQuestion, bookmarked: res.data.bookmarked };
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update bookmark');
  }
});

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    items: [],
    bookmarkedIds: [],
    bookmarkedQuestions: [],
    bookmarksLoading: false,
    bookmarksError: null,
    isLoading: false,
    error: null,
    formOpen: false,
    editingQuestion: null,
  },
  reducers: {
    openForm: (state, action) => {
      state.formOpen = true;
      state.editingQuestion = action.payload || null;
    },
    closeForm: (state) => {
      state.formOpen = false;
      state.editingQuestion = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.formOpen = false;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const idx = state.items.findIndex((q) => q._id === action.payload._id);
        if (idx >= 0) state.items[idx] = { ...state.items[idx], ...action.payload };
        state.formOpen = false;
        state.editingQuestion = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.items = state.items.filter((q) => q._id !== action.payload);
      })
      .addCase(toggleSolved.fulfilled, (state, action) => {
        const q = state.items.find((q) => q._id === action.payload.id);
        if (q) q.solvedByMe = action.payload.solved;
      })
      .addCase(fetchBookmarks.pending, (state) => {
        state.bookmarksLoading = true;
        state.bookmarksError = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.bookmarksLoading = false;
        state.bookmarkedQuestions = action.payload;
        state.bookmarkedIds = action.payload.map((q) => q._id);
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.bookmarksLoading = false;
        state.bookmarksError = action.payload;
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        const { question, bookmarked } = action.payload;
        if (bookmarked) {
          if (!state.bookmarkedIds.includes(question._id)) {
            state.bookmarkedIds.push(question._id);
          }
          if (!state.bookmarkedQuestions.some((q) => q._id === question._id)) {
            state.bookmarkedQuestions.unshift(question);
          }
        } else {
          state.bookmarkedIds = state.bookmarkedIds.filter((id) => id !== question._id);
          state.bookmarkedQuestions = state.bookmarkedQuestions.filter((q) => q._id !== question._id);
        }
      });
  },
});

export const { openForm, closeForm } = questionSlice.actions;
export default questionSlice.reducer;
