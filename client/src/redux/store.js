import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../feature/auth/authSlice.js";
import blogsSlice from "../feature/home/blogsSlice.js";
import genresSlice from "../genres/genresSlice.js";
import commentsSlice from "../feature/comments/commentsSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    blogs: blogsSlice.reducer,
    genres: genresSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export default store;
