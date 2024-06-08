import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/createApi";
import { RootState } from "../redux/store";

export const retrieveAllEvents = createAsyncThunk(
  "posts/events/allEvents",
  async () => {
    try {
      const response = await createAPI("api/events/allEvents", {
        method: "GET",
      })();
      const post = await response.json();
      return post;
    } catch (error: any) {
      return error.message;
    }
  }
);

export const getSingleEvent = createAsyncThunk(
  "api/events/getSingleEvent",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/events/getSingleEvent/${id}`, {
        method: "GET",
      })();
      if (!response.ok) {
        throw new Error("Failed to retrieve single event");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  "api/events/createEvent",
  async (formData: FormData, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState() as RootState;
      const token = state.user.token ?? "";
      const response = await createAPI(`api/events/createEvent`, {
        method: "POST",
        token: token,
      })(formData);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error creating events:", errorData.message);
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

export const updateEvent = createAsyncThunk(
  "api/events/updateEvent",
  async (
    input: {
      id: string;
      title: string;
      description: string;
      date: string;
      time: string;
      location: string;
      user_id: string;
      music: string;
      price: string;
      categories: string[];
    },
    { rejectWithValue, getState }
  ) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/events/updateEvent/${input.id}`, {
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

export const deleteEvent = createAsyncThunk(
  "api/events/deleteEvent",
  async (eventId: string, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/events/deleteEvent/${eventId}`, {
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

export const filterEvents = createAsyncThunk(
  `posts/events/searchEvent`,
  async ({ keyword }: { keyword: string }, { rejectWithValue, getState }) => {
    try {
      const response = await createAPI(
        `api/events/searchEvent?keyword=${keyword}`,
        {
          method: "GET",
        }
      )();

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data");
      }

      const post = await response.json();
      return post;
    } catch (error: any) {
      return error.message;
    }
  }
);
