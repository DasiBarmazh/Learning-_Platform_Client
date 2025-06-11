import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './Thunk';
const userSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'שגיאת התחברות';
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;