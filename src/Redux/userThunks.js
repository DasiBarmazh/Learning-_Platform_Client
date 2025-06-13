import { createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async ({ Name, Phone }, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE_URL}/User/login`, {
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
      return { ...data.user, token: data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE_URL}/User/SignUp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Phone: phone }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'שגיאת רישום');
      }
      const token = await response.text();
      localStorage.setItem('token', token);
      return { name, phone, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserPrompts = createAsyncThunk(
  'users/fetchUserPrompts',
  async (userId, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Prompt/user/${userId}/prompts`);
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'שגיאת שליפת בקשות');
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);