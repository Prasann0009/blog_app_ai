import axios from "axios";
import Endpoints from "../../network/endpoints.js";
import { toast } from "react-toastify";
import { fetchedBlogs, updatePostCreationStatus } from "./blogsSlice.js";
import { ApiStatus } from "../../network/ApiStatus.js";
import request, { RequestMethod } from "../../network/request.js";

export const fetchPostsByGenreId = (genreId) => {
  return async function (dispatch) {
    try {
      dispatch(fetchedBlogs({ apiStatus: ApiStatus.pending }));
      const { data } = await axios.get(Endpoints.posts, {
        params: { genre: genreId },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(
        fetchedBlogs({
          posts: data.data,
          genreId,
          apiStatus: ApiStatus.success,
        })
      );
    } catch (error) {
      toast(error.message);
      dispatch(
        fetchedBlogs({
          apiStatus: ApiStatus.error,
        })
      );
    }
  };
};

export const createPost = (postInfo) => {
  return async function (dispatch) {
    dispatch(updatePostCreationStatus(ApiStatus.pending));
    const { success } = await request({
      url: Endpoints.createPost,
      method: RequestMethod.POST,
      data: postInfo,
    });
    if (success) {
      dispatch(updatePostCreationStatus(ApiStatus.success));
    } else dispatch(updatePostCreationStatus(ApiStatus.error));
  };
};
