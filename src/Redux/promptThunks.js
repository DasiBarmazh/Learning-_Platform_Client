import { createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendPrompt = createAsyncThunk(
  'prompt/sendPrompt',
  async ({ category: categoryId, subCategory, userPrompt, userId }, thunkAPI) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Prompt/lesson`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          subCategoryId,
          userPrompt,
          userId,
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