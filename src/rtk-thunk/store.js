// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import postSlice from "../rtk-thunk/PostSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
  },
});
