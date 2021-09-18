import React from "react";
import "./SearchBar.css";
import searchIcon from "../../media/searchIcon.png";

export function SearchBar() {
  return (
    <div className="searchBar-container">
      <form>
        <input
          className="input-box"
          type="text"
          id="Search"
          name="Search"
          placeholder="Search"
        />
        <input
          className="btn-submit"
          type="image"
          src={searchIcon}
          alt="submit"
        />
      </form>
    </div>
  );
}
