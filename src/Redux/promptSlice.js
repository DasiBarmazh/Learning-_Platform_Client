import { createSlice } from '@reduxjs/toolkit';
import { sendPrompt } from './promptThunks';

const promptSlice = createSlice({
  name: 'prompt',
  initialState: {
    userPrompt: '',
    lesson: '',
    loading: false,
    error: null,
  },
  reducers: {
    setUserPrompt: (state, action) => {
      state.userPrompt = action.payload;
    },
    clearPrompt: (state) => {
      state.userPrompt = '';
      state.lesson = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendPrompt.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lesson = '';
      })
      .addCase(sendPrompt.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload;
      })
      .addCase(sendPrompt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserPrompt, clearPrompt } = promptSlice.actions;
export default promptSlice.reducer;