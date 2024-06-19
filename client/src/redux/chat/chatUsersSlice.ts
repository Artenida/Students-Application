import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import { getUserId } from "../../api/chatUsersThunk";

interface UserState {
  chatUser: any[];
  retrieveError: string | null
}

const initialState: UserState = {
  chatUser: [],
  retrieveError: null,
};

const userSlice = createSlice({
  name: "chatUser",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserId.fulfilled, (state, action) => {
        state.chatUser = action.payload;
        state.retrieveError = null;
      })
      .addCase(getUserId.rejected, (state, action) => {
        state.retrieveError = action.payload as string;
      });
  },
});

export const selectUserChat = (state: RootState) => state.chatUser;
export default userSlice.reducer;