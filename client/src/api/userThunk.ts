import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/createApi";
import { RootState } from "../redux/store";

type UserBodyType = {
  username: string;
  password: string;
};

type ContactType = {
  from: string,
  subject: string,
  message: string,
}

type UserBodyTypeRegister = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
};

type UserBodyTypeUpdate = {
  id: string;
  username: string;
  email: string;
  fields: string;
  bio: string;
  profile_picture: string;
};

type UserEndpointType = {
  token?: string;
  body: UserBodyTypeUpdate;
};

type RegisterUserResponse = {
  data: any;
  error?: string;
};

export const loginUser = createAsyncThunk(
  "api/auth/login",
  async (body: UserBodyType, { rejectWithValue }) => {
    try {
      const response = await createAPI("api/auth/login", { method: "POST" })(
        body
      );
      const data = await response.json();
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk<
  RegisterUserResponse,
  UserBodyTypeRegister
>(
  "api/auth/register",
  async (body: UserBodyTypeRegister, { rejectWithValue }) => {
    try {
      const response = await createAPI("api/auth/register", { method: "POST" })(
        body
      );
      if (response.status === 201) {
        const data = await response.json();
        return data;
      } else {
        const error = await response.json();
        return rejectWithValue(error.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "api/users/delete",
  async (userId: number, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token = state.user.token ?? "";
      const response = await createAPI(`api/users/delete/${userId}`, {
        method: "DELETE",
        token: token,
      })(null);
      if (!response.ok) {
        const errorMessage = await response.text();
        return rejectWithValue(errorMessage);
      }
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "api/users/updateUser",
  async ({ body }: UserEndpointType, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/users/updateUser/${body.id}`, {
        method: "PUT",
        token: token,
        body: JSON.stringify(body),
      })(body);
      const data = await response.json();
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfilePicture = createAsyncThunk(
  "api/users/updatePicture",
  async (formData: FormData, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token: string = state.user.token ?? "";

      const response = await createAPI(`api/users/updatePicture`, {
        method: "PUT",
        token: token,
        body: JSON.stringify(formData),
      })(formData);

      const data = await response.json();
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "api/users/find",
  async (userId: string, { rejectWithValue, getState }) => {
    try {
      const state: RootState = getState() as RootState;
      const token = state.user.token ?? "";
      const response = await createAPI(`api/users/find/${userId}`, {
        method: "GET",
        token: token,
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

export const contact = createAsyncThunk(
  "api/auth/contact",
  async (body: ContactType, { rejectWithValue }) => {
    try {
      const response = await createAPI("api/auth/contact", { method: "POST" })(
        body
      );
      const data = await response.json();
      return !response.ok ? rejectWithValue(data.message) : data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);