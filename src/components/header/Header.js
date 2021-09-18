import React from "react";
import "./Header.css";
import { SearchBar } from "./SearchBar";
import logo from "../../media/logo.png";

export function Header() {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo} alt="logo"></img>
        <span>Reader For Reddit</span>
      </div>
      <SearchBar />
    </div>
  );
}
