import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loadPosts,
  loadSubreddits,
  setSearchTerm,
  clearData,
} from "../searchResults/searchResultsSlice";
import "./SearchBar.css";
import {
  unsetDisabledById,
  setAllToUnselected,
  setToSelectedById,
} from "../QuickAccessBar/quickAccessBarSlice";
import { setAllInactive } from "../subredditsPanel/subredditsSlice";
import { media } from "../../media/media";
import { useHistory } from "react-router-dom";

export function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [term, setTerm] = useState("");

  //When hit ender or press search button
  function handleSubmit(e) {
    e.preventDefault();
    //if search term is empty return
    if (!term) return;
    //Store search term in the state
    dispatch(setSearchTerm(term));
    //Clear previos search results
    dispatch(clearData());
    //Load post with given term
    dispatch(loadPosts({ term, type: "searchTerm" }));
    //Load subreddits with given term
    dispatch(loadSubreddits(term));
    //Unselect all buttons from quickAccess bar
    dispatch(setAllToUnselected());
    //Set Posts button to selected
    dispatch(setToSelectedById("posts"));
    //Enable Subreddits content button
    dispatch(unsetDisabledById("subreddits"));
    //set all featured subreddits to inactive state
    dispatch(setAllInactive());
    //Clear serch bar
    setTerm("");
    history.push("/posts");
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
          src={media.searchIcon}
          alt="submit"
        />
      </form>
    </div>
  );
}
