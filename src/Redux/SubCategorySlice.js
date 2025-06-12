import { createSlice } from '@reduxjs/toolkit';
import { fetchSubCategories } from './subCategoryThunks';

const subCategorySlice = createSlice({
  name: 'subCategories',
  initialState: {
    subCategories: [],
    currentSubCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentSubCategory: (state, action) => {
      state.currentSubCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentSubCategory } = subCategorySlice.actions;
export default subCategorySlice.reducer;