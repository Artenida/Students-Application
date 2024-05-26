import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../redux/store";
import { deleteEvent, retrieveAllEvents, createEvent, getSingleEvent } from "../../api/eventThunk";

export interface EventType {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  user_id: string;
  image: string;
  profile_picture: string;
  music: string;
  cost: string;
  email: string;
  }
interface PostState {
  currentEvents: EventType[];
  loading: boolean;
  retrieveError: string | null;
  deleteError: string | null;
  createError: string | null;
  successful: boolean;
  eventDetails: EventDetails[];
}
interface Categories {
  id: number;
  category: string;
}
interface EventDetails {
  user_id: string;
  username: string;
  profile_picture: string;
  post_id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  categories: Categories[];
  categoryId: string;
}

const initialState: PostState = {
  currentEvents: [],
  retrieveError: null,
  deleteError: null,
  createError: null,
  loading: false,
  successful: false,
  eventDetails: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(retrieveAllEvents.pending, (state) => {
        state.loading = true;
        state.retrieveError = null;
      })
      .addCase(retrieveAllEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.retrieveError = null;
        state.currentEvents = action.payload.data;
      })
      .addCase(retrieveAllEvents.rejected, (state, action) => {
        state.loading = false;
        state.retrieveError = action.payload as string;
      })

      .addCase(getSingleEvent.pending, (state) => {
        state.retrieveError = null;
        state.loading = true;
      })
      .addCase(getSingleEvent.fulfilled, (state, action) => {
        state.retrieveError = null;
        state.loading = false;
        state.eventDetails = action.payload.data;
      })
      .addCase(getSingleEvent.rejected, (state, action) => {
        state.retrieveError = action.payload as string;
        state.loading = false;
        state.eventDetails = initialState.eventDetails;
      })

      .addCase(deleteEvent.pending, (state) => {
        state.deleteError = null;
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteError = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.payload as string;
      })

      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.createError = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.createError = null;
        state.successful = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload as string;
        state.successful = false;
      })
  },
});

export const selectEvent = (state: RootState) => state.event;
export default eventSlice.reducer;
