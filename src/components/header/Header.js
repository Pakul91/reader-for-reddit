import React from "react";
import "./Header.css";
import { SearchBar } from "./SearchBar";
import logo from "../../media/logo.png";

export function Header() {
  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo} alt="logo"></img>
        <span className="name">
          <span className="R">R</span>eader For <span className="R">R</span>
          eddit
        </span>
        <span className="name-short">
          <span className="R">R</span>4<span className="R">R</span>
        </span>
      </div>
      <SearchBar />
    </div>
  );
}
