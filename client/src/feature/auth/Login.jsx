import React from "react";

const Login = () => {
  return (
    <div className="auth-container">
      <form className="form login-form">
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
