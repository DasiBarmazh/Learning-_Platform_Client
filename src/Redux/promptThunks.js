import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendPrompt = createAsyncThunk(
  'prompt/sendPrompt',
  async ({ category, subCategory, userPrompt }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:5282/api/Prompt/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          subCategory,
          userPrompt,
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