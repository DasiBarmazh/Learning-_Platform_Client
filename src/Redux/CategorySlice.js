import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './categoryThunks';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    currentCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentCategory: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;