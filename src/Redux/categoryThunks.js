import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5282/api/Category/all', {
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