import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import {
  createPost,
  deletePost,
  filterPosts,
  getMyPosts,
  getSinglePost,
  getWritersPosts,
  retrieveAllPosts,
  retrievePaginatedPosts,
  updatePost,
} from "../../api/postThunk";

interface Image {
  url: string;
}

interface PostDetails {
  userId: string;
  username: string;
  profile_picture: string;
  postId: string;
  title: string;
  description: string;
  createdAt: Date;
  images: Image[];
}

interface Paginated {
  id: string;
  images: Image[];
  title: string;
  username: string;
  profile_picture: string | undefined;
  description: string;
  createdAt: Date;
  user_id: string;
}
interface PaginatedPosts {
  result: Paginated[];
  totalPosts?: number;
  pageCount?: number;
  next: { pageAsNumber: number };
  prev: { pageAsNumber: number };
}
interface Authors {
  id: string;
  username: string;
  profile_picture: string;
  bio: string;
}

interface PostState {
  currentPost: [] | null;
  searchedPost: [] | null;
  writersPosts: [];
  filterSearch: string | null;
  paginatedPost: PaginatedPosts | null;
  currentAuthor: Authors[];
  loading: boolean;
  successful: boolean;
  successfulUpdate: boolean;
  retrieveError: string | null;
  deleteError: string | null;
  createError: string | null;
  updateError: string | null;
  deleteSuccessful: string | null;
  isUpdated: boolean;
  myPost: [];
  postNr: number | null;
  postDetails: PostDetails[];
}

const initialState: PostState = {
  currentPost: [],
  searchedPost: [],
  writersPosts: [],
  filterSearch: null,
  paginatedPost: null,
  currentAuthor: [],
  retrieveError: null,
  deleteError: null,
  updateError: null,
  deleteSuccessful: null,
  createError: null,
  loading: false,
  successful: false,
  successfulUpdate: false,
  isUpdated: false,
  postNr: null,
  myPost: [],
  postDetails: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(retrieveAllPosts.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrieveAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.currentPost = action.payload.data;
      })
      .addCase(retrieveAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })

      .addCase(getSinglePost.pending, (state) => {
        state.retrieveError = null;
        state.loading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action) => {
        state.retrieveError = null;
        state.loading = false;
        state.postDetails = action.payload.data;
      })
      .addCase(getSinglePost.rejected, (state, action) => {
        state.retrieveError = action.payload as string;
        state.loading = false;
        state.postDetails = initialState.postDetails;
      })

      .addCase(getMyPosts.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPost = action.payload;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })

      .addCase(deletePost.pending, (state) => {
        state.deleteError = null;
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteError = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload as string;
      })

      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.createError = null;
        state.successful = true;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload as string;
        state.successful = false;
      })

      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.successfulUpdate = true;
        state.updateError = null;
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.successfulUpdate = false;
        state.loading = false;
        state.updateError = action.payload as string;
      })

      .addCase(retrievePaginatedPosts.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrievePaginatedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.paginatedPost = action.payload;
      })
      .addCase(retrievePaginatedPosts.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })

      .addCase(filterPosts.pending, (state) => {
        state.filterSearch = null;
      })
      .addCase(filterPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterSearch = null;
        state.searchedPost = action.payload;
      })
      .addCase(filterPosts.rejected, (state, action) => {
        state.filterSearch = action.payload as string;
      })

      .addCase(getWritersPosts.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(getWritersPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.writersPosts = action.payload;
        state.retrieveError = null;
      })
      .addCase(getWritersPosts.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })
  },
});

export const selectPost = (state: RootState) => state.post;
export default postSlice.reducer;
