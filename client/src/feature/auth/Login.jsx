import React, { useState } from "react";
import Button from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "./authSelectors";
import { loginMiddleware } from "./authMiddleware";
import { ApiStatus } from "../../network/ApiStatus";

const Login = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");
  const { errorMessage, apiStatus } = useSelector(loginSelector);
  const dispatch = useDispatch();

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = {
      email: form["email"].value,
      password: form["password"].value,
    };

    dispatch(loginMiddleware(formData));
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/auth/login",
    //     formData
    //   );
    //   console.log("Login success", response.data);
    // } catch (error) {
    //   console.log("error", error);
    //   setError(error.response.data.message ?? "Something went wrong");
    // }
  }

  return (
    <div className="auth-container">
      <form className="form login-form" onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button text="Login" isLoading={apiStatus === ApiStatus.pending} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
