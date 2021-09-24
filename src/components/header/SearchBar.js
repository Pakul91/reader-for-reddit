import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../searchResults/searchResultsSlice";
import "./SearchBar.css";
import searchIcon from "../../media/searchIcon.png";
import {
  unsetDisabledById,
  setAllToUnselected,
  setToSelectedById,
} from "../QuickAccessBar/quickAccessBarSlice";

export function SearchBar() {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");

  //When hit ender or press search button
  function handleSubmit(e) {
    e.preventDefault();
    //if search term is empty return
    if (!term) return;
    //Load post with given term
    dispatch(loadPosts({ term, type: "searchTerm" }));
    //Load subreddits with given term
    //
    //Unselect all buttons from quickAccess bar
    dispatch(setAllToUnselected());
    //Set Posts button to selected
    dispatch(setToSelectedById("posts"));
    //Enable Subreddits content button
    dispatch(unsetDisabledById("subreddits"));
    //Clear serch bar
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
