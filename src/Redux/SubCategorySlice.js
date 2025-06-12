import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubCategories = createAsyncThunk(
  'subCategories/fetchSubCategories',
  async (categoryId, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:5282/api/Category/${categoryId}/subcategories`);
      if (!response.ok) {
        const err = await response.text();
        throw new Error(err || 'שגיאת שרת');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'שגיאת שרת');
    }
  }
);

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