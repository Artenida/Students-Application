import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/createApi";
import { RootState } from "../redux/store";

type UserEndpointType = {
  token?: string;
  userId: string;
};

export const retrieveAllPosts = createAsyncThunk(
  "posts/posts/allPosts",
  async () => {
    try {
      const response = await createAPI("api/posts/allPosts", {
        method: "GET",
      })();
      const post = await response.json();
      return post;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const getSinglePost = createAsyncThunk(
  "api/posts/getSinglePost",
  async (postId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/posts/getSinglePost/${postId}`, {
        method: "GET",
      })();
      if (!response.ok) {
        throw new Error("Failed to retrieve single post");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMyPosts = createAsyncThunk(
  "api/posts/user",
  async ({ userId }: UserEndpointType, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/posts/user/${userId}`, {
        method: "GET",
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

export const deletePost = createAsyncThunk(
  "api/posts/delete",
  async (postId: string, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/posts/delete/${postId}`, {
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

export const createPost = createAsyncThunk(
  "api/posts/createPost",
  async (formData: FormData, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const token = state.user.token ?? "";
      const response = await createAPI(`api/posts/createPost`, {
        method: "POST",
        token: token,
      })(formData);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating post:", errorData.message);
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

export const updatePost = createAsyncThunk(
  "api/posts/update",
  async (
    input: {
      postId: string;
      title: string;
      description: string;
      tags: string[];
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/posts/update/${input.postId}`, {
        method: "PUT",
        token: token,
      })(input);

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

export const retrievePaginatedPosts = createAsyncThunk(
  "posts/posts/paginatedPosts",
  async ({ currentPage, limit }: { currentPage: number; limit: number }, { rejectWithValue, getState }) => {
    try {
      const response = await createAPI(`api/posts/paginatedPosts?page=${currentPage}&limit=${limit}`, {
        method: "GET",
      })();
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch data');
      }
      
      const data = await response.json();
      
      if (!data || typeof data !== 'object' || !('result' in data)) {
        throw new Error('Invalid response data');
      }
      
      return data;
      
    } catch (error: any) {
      return error.message;
    }
  }
);

export const filterPosts = createAsyncThunk (
  `posts/posts/search`,
async ({ keyword }: { keyword: string }, { rejectWithValue, getState }) => {
  try {
    const response = await createAPI(`api/posts/search?keyword=${keyword}`, {
      method: "GET",
    })();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch data');
    }
    
    const post = await response.json();
    return post;
  } catch (error: any) {
    return error.message;
  }
})

export const getWritersPosts = createAsyncThunk(
  "api/posts/users",
  async (userId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/posts/users/${userId}`, {
        method: "GET",
      })();
      if (!response.ok) {
        throw new Error("Failed to retrieve single post");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);