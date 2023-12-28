// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    userName: string;
  }

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    signup: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
        state.isAuthenticated = action.payload;
      },
  },
});

export const { login, logout, signup, setAuthenticated} = authSlice.actions;
export default authSlice.reducer;
