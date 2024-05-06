import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/createApi";
import { RootState } from "../redux/store";

export interface CreateCommentTypes {
  postId: string
  userId: string
  comment_text: string
}

export const deleteComment = createAsyncThunk(
  "api/comments/deleteComment",
  async (commentId: string, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/comments/deleteComment/${commentId}`, {
        method: "DELETE",
        token: token,
      })();

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error fetching data:", errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  "api/comments/addComment",
  async (createComment: CreateCommentTypes, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const token = state.user.token ?? "";
      const response = await createAPI(`api/comments/addComment/${createComment.postId}`, {
        method: "POST",
        token: token,
      })(createComment);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating comment:", errorData.message);
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error: any) {
      console.error("Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const getCommentsForPost = createAsyncThunk(
  "api/comments/getCommentsForPost",
  async (postId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/comments/getCommentsForPost/${postId}`, {
        method: "GET",
      })();
      if (!response.ok) {
        throw new Error("Failed to retrieve comments");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);