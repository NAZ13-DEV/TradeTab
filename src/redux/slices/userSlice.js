// src/redux/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// Initial state
const initialState = {
  loading: false,
  user: null,
  error: null,
  message: null,
};

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('registerUser', userData);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.errors?.[0] || 'An error occurred'
      );
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.email;
        state.message = action.payload.status;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
