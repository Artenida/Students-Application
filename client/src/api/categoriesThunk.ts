import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/createApi";

  export const retrieveAllCategories = createAsyncThunk(
    "posts/categories/getCategories",
    async () => {
      try {
        const response = await createAPI("api/categories/getCategories", {
          method: "GET",
        })();
        const post = await response.json();
        return post;
      } catch (error: any) {
        return error.message;
      }
    }
  );