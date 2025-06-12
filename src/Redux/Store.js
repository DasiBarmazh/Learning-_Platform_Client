import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './CategorySlice';
import subCategoryReducer from './subCategorySlice';
import userReducer from './userSlice';
import promptReducer from './promptSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
    prompt: promptReducer,
  },
});

export default store;