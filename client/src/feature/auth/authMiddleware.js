import axios from "axios";
import { ApiStatus } from "../../network/ApiStatus.js";
import {
  mutateLoginState,
  mutateSignupState,
  updateLoginStatus,
} from "./authSlice.js";
import Endpoints from "../../network/endpoints.js";

export const signupMiddleware = (formData) => {
  return async function (dispatch) {
    dispatch(mutateSignupState({ apiStatus: ApiStatus.pending }));
    try {
      const response = await axios.post(Endpoints.signup, formData);
      dispatch(mutateSignupState({ apiStatus: ApiStatus.success }));
      console.log("Register success", response.data);
    } catch (error) {
      dispatch(
        mutateSignupState({
          apiStatus: ApiStatus.error,
          errorMessage: error.response?.data?.message || "Signup failed",
        })
      );
      console.log("error", error);
    }
  };
};

export const loginMiddleware = (formData) => {
  return async function (dispatch) {
    dispatch(mutateLoginState({ apiStatus: ApiStatus.pending }));
    try {
      const response = await axios.post(Endpoints.login, formData);
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch(mutateLoginState({ apiStatus: ApiStatus.success }));
      dispatch(updateLoginStatus(true));
    } catch (error) {
      dispatch(
        mutateLoginState({
          apiStatus: ApiStatus.error,
          errorMessage: error.response?.data?.message || "Something went wrong",
        })
      );
      console.log("error", error);
    }
  };
};
