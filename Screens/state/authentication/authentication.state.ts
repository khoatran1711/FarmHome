import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {
  AuthenticationState,
  AUTHENTICATION_STATE_NAME,
} from './authentication.constant';

const initialState: AuthenticationState = {
  token: '',
  isLoading: false,
  id: 0,
};

export const AuthenticationSlice = createSlice({
  name: AUTHENTICATION_STATE_NAME,
  initialState,
  reducers: {
    // Start loading
    logIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // End loading
    logOut: state => {
      state.token = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const AuthenticationReducer = AuthenticationSlice.reducer;
export const AuthenticationActions = AuthenticationSlice.actions;
