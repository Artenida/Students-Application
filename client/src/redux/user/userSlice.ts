import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import { loginUser, registerUser } from "../../api/userThunk";

interface UserState {
  currentUser: any;
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
  token?: string;
  isLoggedIn: boolean;
  user: any;
  success: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loginError: null,
  registerError: null,
  loading: false,
  token: undefined,
  isLoggedIn: false,
  user: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOutSuccess: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
      state.loginError = null;
      state.loading = false;
      state.token = undefined;
      state.success = false;
      state.registerError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoggedIn = false;
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.loginError = null;
        state.currentUser = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload as string;
        state.isLoggedIn = false;
        state.token = undefined;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerError = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload as string;
        state.success = false;
      })
  },
});

export const { signOutSuccess } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
