// src/redux/slices/fetchTradeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// Async thunk to fetch user trade data
export const fetchUserTrade = createAsyncThunk(
  'user/fetchUserTrade',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`fetchUserTrade/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const fetchTrade = createSlice({
  name: 'trade',
  initialState: {
    user: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.user = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTrade.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserTrade.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.message;
      })
      .addCase(fetchUserTrade.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user details';
      });
  },
});

export const { clearUserState } = fetchTrade.actions;
export default fetchTrade.reducer;
