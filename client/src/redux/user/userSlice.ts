import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import {
  addSocialMediaAccount,
  deleteUser,
  getUser,
  loginUser,
  registerUser,
  updateProfilePicture,
  updateUser,
} from "../../api/userThunk";

interface SocialMediaType {
  id: String;
  account: String;
}
interface UserState {
  currentUser: any;
  socialMedia: SocialMediaType;
  loading: boolean;
  loginError: string | null;
  registerError: string | null;
  socialMediaError: string | null;
  deleteError: string | null;
  updateError: string | null;
  token?: string;
  isLoggedIn: boolean;
  isUpdated: boolean;
  user: any;
  success: boolean;
}

const initialState: UserState = {
  currentUser: null,
  socialMedia: {
    id: " ",
    account: " ",
  },
  loginError: null,
  registerError: null,
  deleteError: null,
  updateError: null,
  socialMediaError: null,
  loading: false,
  token: undefined,
  isLoggedIn: false,
  isUpdated: false,
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
      .addCase(deleteUser.pending, (state) => {
        state.deleteError = null;
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.currentUser = null;
        state.deleteError = null;
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.isUpdated = true;
        state.updateError = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.updateError = null;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = true;
        state.isUpdated = false;
        state.updateError = action.payload as string | null;
      })

      .addCase(addSocialMediaAccount.pending, (state) => {
        state.loading = true;
        state.socialMediaError = null;
      })
      .addCase(addSocialMediaAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.socialMediaError = null;
        state.isLoggedIn = true;
        state.socialMedia = action.payload;
      })
      .addCase(addSocialMediaAccount.rejected, (state, action) => {
        state.loading = true;
        state.socialMediaError = action.payload as string | null;
      })

      .addCase(updateProfilePicture.fulfilled, (state, action) => {
        state.isUpdated = true;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { signOutSuccess } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
