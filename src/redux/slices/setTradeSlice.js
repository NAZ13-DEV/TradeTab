// src/redux/slices/setTradeSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

// Async thunk to save form data to the DB
export const saveTradeData = createAsyncThunk(
  'form/saveTradeData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('saveTrade', formData);
      return response.data.message;  
    } catch (error) {
      return rejectWithValue(error.response?.data?.data?.errors[0] || 'An error occurred'); 
    }
  }
);

// Initial state for the slice
const initialState = {
  formFields: {
    amount: '',
    symbol: '',
    interval: '',
    leverage: '',
    stopLoss: '',
    takeProfit: '',
    entryPrice: '',
    tradeType: '',
    userId: '',
    tradingPair: '',
    tradeId: '',
  },
  loadingTrade: false,
  Tradeerror: null,
  tradeSuccess: false,
};

// Create the slice
const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFieldValue: (state, action) => {
      const { fieldName, value } = action.payload;
      state.formFields[fieldName] = value;
    },
    clearState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveTradeData.pending, (state) => {
        state.loadingTrade = true;
        state.Tradeerror = null;
      })
      .addCase(saveTradeData.fulfilled, (state, action) => {
        state.loadingTrade = false;
        state.tradeSuccess = action.payload;
      })
      .addCase(saveTradeData.rejected, (state, action) => {
        state.loadingTrade = false;
        state.Tradeerror = action.payload;
      });
  },
});

// Export the actions and reducer
export const { setFieldValue, clearState } = formSlice.actions;
export default formSlice.reducer;
