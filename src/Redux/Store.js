import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import categoryReducer from './CategorySlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    categories: categoryReducer,
  },
});

export default store;