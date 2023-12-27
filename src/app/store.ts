import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import itemReducer from "../features/item/itemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;