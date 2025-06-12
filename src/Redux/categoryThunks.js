import { createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/Category/all`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'שגיאת שרת');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'TypeError') {
        return thunkAPI.rejectWithValue('שרת לא זמין');
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);