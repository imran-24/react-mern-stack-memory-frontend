import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import memoryReducer from '../features/memory/memorySlice'
import viewReducer from '../features/memory/viewSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    memory: memoryReducer,
    view: viewReducer,
    
  },
});
