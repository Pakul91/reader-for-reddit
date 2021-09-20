import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../searchResults/searchResultsSlice";
import "./SearchBar.css";
import searchIcon from "../../media/searchIcon.png";

export function SearchBar() {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(loadPosts({ term, type: "searchTerm" }));

    setTerm("");
  }

  return (
    <div className="searchBar-container">
      <form onSubmit={handleSubmit}>
        <input
          className="input-box"
          type="text"
          id="Search"
          name="Search"
          value={term}
          placeholder="Search"
          onChange={(e) => setTerm(e.target.value)}
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
