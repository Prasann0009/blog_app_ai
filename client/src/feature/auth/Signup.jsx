import React, { useState } from "react";
import axios from "axios";
import "./auth.scss";
import Button from "../../components/button/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signupSelector } from "./authSelectors.js";
import { signupMiddleware } from "./authMiddleware.js";
import { ApiStatus } from "../../network/ApiStatus.js";

const Signup = () => {
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { errorMessage, apiStatus } = useSelector(signupSelector);
  // console.log(signupInfo);

  const onSignup = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      name: form["name"].value,
      password: form["password"].value,
      email: form["email"].value,
      gender: form["gender"].value,
    };

    dispatch(signupMiddleware(formData));

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/auth/signup",
    //     formData
    //   );
    //   console.log("Register success", response.data);
    //   setLoading(false);
    // } catch (error) {
    //   console.log("error", error.response);
    //   setError(error.response.data.message ?? "Something went wrong");
    // }
  };

  return (
    <div className="auth-container">
      <form className="form signup-form" onSubmit={onSignup}>
        <input type="text" name="name" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div>
          <label htmlFor="male">Male</label>
          <input type="radio" name="gender" value="MALE" id="male" required />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            name="gender"
            value="FEMALE"
            id="female"
            required
          />
        </div>
        <Button text="Signup" isLoading={apiStatus === ApiStatus.pending} />
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Signup;
