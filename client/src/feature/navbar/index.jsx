import React from "react";
import "./navbar.scss";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="navbar-container">
      <div className="left-container">
        <img
          src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png"
          alt="logo"
        />
      </div>
      <div className="right-container">
        <NavLink to="/signup" className="btn signup-btn">
          Signup
        </NavLink>
        <NavLink to="/login" className="btn login-btn">
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default NavigationBar;
