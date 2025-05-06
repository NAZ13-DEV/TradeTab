import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userSlice';
import fetchSliceReducer from './slices/fetchUserSlice';
import formSliceReducer from './slices/setTradeSlice';
import fetchTradeReducer from './slices/fetchTradeSlice';
import dashboardReducer from './slices/fetchHistory';
import notificationReducer  from './slices/fetchNotiSlice';

const store = configureStore({
  reducer: {
    registerUser: userSliceReducer,
    fetchUserDetails: fetchSliceReducer,
    processTrade: formSliceReducer,
    fetchTrade: fetchTradeReducer,
    fetchHistory: dashboardReducer,
    notifications: notificationReducer, 
  },
});

export default store;
