// src/redux/slices/fetchHistory.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async () => {
    const id = localStorage.getItem('uId');
    if (!id) {
      throw new Error('User ID not found in localStorage');
    }
    const response = await api.get(`fetchAllHistory/${id}`);
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    deposits: null,
    profits: null,
    userPlans: null,
    cryptoWithdrawals: null,
    bankWithdrawals: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.deposits = action.payload.message.deposits;
        state.profits = action.payload.message.profits;
        state.userPlans = action.payload.message.userPlans;
        state.cryptoWithdrawals = action.payload.message.cryptoWithdrawals;
        state.bankWithdrawals = action.payload.message.bankWithdrawals;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;
