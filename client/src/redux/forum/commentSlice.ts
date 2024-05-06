import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import {
  createComment,
  deleteComment,
  getCommentsForPost,
} from "../../api/commentThunk";

interface PostState {
  allComments: [] | null;
  loadingComments: boolean;
  retrieveCommentError: string | null;
  deleteCommentError: string | null;
  createCommentError: string | null;
}

const initialState: PostState = {
  allComments: [],
  loadingComments: false,
  retrieveCommentError: null,
  deleteCommentError: null,
  createCommentError: null,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCommentsForPost.pending, (state) => {
        state.loadingComments = true;
        state.retrieveCommentError = null;
      })
      .addCase(getCommentsForPost.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.allComments = action.payload;
        state.retrieveCommentError = null;
      })
      .addCase(getCommentsForPost.rejected, (state, action) => {
        state.loadingComments = false;
        state.retrieveCommentError = action.payload as string;
      })

      .addCase(deleteComment.pending, (state) => {
        state.deleteCommentError = null;
        state.loadingComments = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.deleteCommentError = null;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loadingComments = false;
        state.deleteCommentError = action.payload as string;
      })

      .addCase(createComment.pending, (state) => {
        state.loadingComments = true;
        state.createCommentError = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.createCommentError = null;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loadingComments = false;
        state.createCommentError = action.payload as string;
      });
  },
});

export const selectComment = (state: RootState) => state.comments;
export default commentSlice.reducer;
