import React from "react";
import logo from "../../media/logo.png";
import "./LoadingSpinner.css";

export function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner-container">
        <img src={logo} alt="logo" />
      </div>
      <p>Loading data...</p>
    </div>
  );
}
