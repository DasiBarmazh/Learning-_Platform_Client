import { createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 


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
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// thunk לרישום משתמש חדש
export const registerUser = createAsyncThunk(
  'users/registerUser',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5282/api/User/SignUp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Phone: phone }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'שגיאת רישום');
      }
      const token = await response.json();
      localStorage.setItem('token', token);
      return { name, phone, token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);