import { createSlice } from "@reduxjs/toolkit";
import { retrieveAllCategories } from "../../api/categoriesThunk";
import { RootState } from "../store";

interface Categories {
  id: number;
  category: string;
}

interface PostState {
  categories: Categories[];
  retrieveError: string | null;
  loading: boolean;
}

const initialState: PostState = {
  categories: [],
  retrieveError: null,
  loading: false,
};

const tagsSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(retrieveAllCategories.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrieveAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.categories = action.payload.data;
      })
      .addCase(retrieveAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      });
  },
});

export const selectCategories = (state: RootState) => state.categories;
export default tagsSlice.reducer;
