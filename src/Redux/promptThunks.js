import { createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; 

export const sendPrompt = createAsyncThunk(
  'prompt/sendPrompt',
  async ({ category, subCategory, userPrompt, userId }, thunkAPI) => { // הוסף userId כאן
    try {
      const response = await fetch(`${API_BASE_URL}/Prompt/lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          subCategory,
          userPrompt,
          userId, // הוסף את userId ל-body
        }),
      });
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'שגיאת שרת');
      }
      const data = await response.json();
      return data.lesson;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'שגיאת שרת');
    }
  }
);