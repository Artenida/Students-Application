import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAPI } from "../utils/createApi";

type UserBodyType = {
  username: string;
  password: string;
};

type UserBodyTypeRegister = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
};

type UserBodyTypeUpdate = {
  username: string;
  email: string;
  bio: string;
  profile_picture: string;
  userId: number;
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