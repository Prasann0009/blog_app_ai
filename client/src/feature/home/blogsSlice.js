import { createSlice } from "@reduxjs/toolkit";
import { ApiStatus } from "../../network/ApiStatus";

const blogsSlice = createSlice({
  name: "Blogs",
  initialState: {
    // generes: [],
    read: {
      apiStatus: ApiStatus.init,
    },
    create: {
      apiStatus: ApiStatus.init,
    },
  },
  reducers: {
    fetchedBlogs: (state, { payload }) => {
      const { genreId, posts, apiStatus } = payload;
      if (genreId && posts) {
        state[genreId] = posts;
      }
      state.read.apiStatus = apiStatus;
    },
    updatePostCreationStatus: (state, { payload }) => {
      state.create = payload;
    },
  },
});

export const { fetchedBlogs, updatePostCreationStatus } = blogsSlice.actions;
export default blogsSlice;
