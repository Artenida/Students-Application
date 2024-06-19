// chatUsersThunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAPI } from '../utils/createApi';

interface GetUserIdResponse {
  userId: string;
}

interface GetUserIdError {
  message: string;
}

export const getUserId = createAsyncThunk(
  'api/getUserId',
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await createAPI(`api/getUserId`, { method: 'POST' })(username);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error getting the id of the user:', errorData.message);
        return rejectWithValue({ message: errorData.message });
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error:', error.message);
      return rejectWithValue({ message: error.message });
    }
  }
);
