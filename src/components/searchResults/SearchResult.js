import React from "react";
import { useDispatch } from "react-redux";
import "./SearchResults.css";
import textIcon from "../../media/textIcon.png";
import { formatTime, formatUps } from "../../HELPERS";
import { toggleDatailedViewById } from "./searchResultsSlice";

export function SearchResult({ post }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(toggleDatailedViewById(post.id));
  };

  return (
    <div className="searchResult-container" onClick={handleClick}>
      <div className="ups">{formatUps(post)}</div>
      <div className="thumbnail-container">
        <img
          src={
            !post.thumbnail || post.thumbnail === "self"
              ? textIcon
              : post.thumbnail
          }
          alt=""
        />
      </div>
      <div className="content-container">
        <p className="title">{post.title}</p>
        <span className="date-stamp">Posted: {formatTime(post)} ago.</span>
      </div>
    </div>
  );
}
