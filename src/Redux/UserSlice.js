import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser ,fetchUserPrompts} from './userThunks';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    currentUser: null,
    prompts: [],
    loading: false,
    error: null,
    registerSuccess: false,
  },
  reducers: {
    clearRegisterSuccess: (state) => {
      state.registerSuccess = false;
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
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.registerSuccess = true;
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.registerSuccess = false;
      });
       builder
      .addCase(fetchUserPrompts.pending, (state) => {
        state.loadingPrompts = true;
        state.errorPrompts = null;
      })
      .addCase(fetchUserPrompts.fulfilled, (state, action) => {
        state.loadingPrompts = false;
        state.prompts = action.payload;
      })
      .addCase(fetchUserPrompts.rejected, (state, action) => {
        state.loadingPrompts = false;
        state.errorPrompts = action.payload;
      });
  }, 
});

export const { clearRegisterSuccess } = userSlice.actions;
export default userSlice.reducer;