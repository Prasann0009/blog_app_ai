import React from "react";
import "./button.scss";

const Button = ({ text, isLoading = false }) => {
  return (
    <button className="api-loading-button" disabled={isLoading}>
      <div className="loader"></div>
      <span>{text}</span>
    </button>
  );
};

export default Button;
