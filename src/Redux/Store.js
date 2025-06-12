import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import categoryReducer from './CategorySlice';
import subCategoryReducer from './SubCategorySlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
    subCategories: subCategoryReducer,
  },
});

export default store;