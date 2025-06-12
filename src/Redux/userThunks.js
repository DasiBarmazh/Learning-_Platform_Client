import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ Name, Phone }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5282/api/User/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name, Phone }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'שגיאת התחברות');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);