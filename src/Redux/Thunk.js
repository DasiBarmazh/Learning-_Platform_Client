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
        console.error('שגיאת שרת:', response.status, err);
        throw new Error(err || 'שגיאת שרת');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'TypeError') {
        return thunkAPI.rejectWithValue('שרת לא זמין');
      }
      console.error('שגיאה ב-fetchCategories:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchSubCategories = createAsyncThunk(
  'subCategories/fetchSubCategories',
  async (categoryId, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5282/api/Category/${categoryId}/subcategories`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        const err = await response.text();
        console.error('שגיאת שרת:', response.status, err);
        throw new Error(err || 'שגיאת שרת');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'TypeError') {
        return thunkAPI.rejectWithValue('שרת לא זמין');
      }
      console.error('שגיאה ב-fetchSubCategories:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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