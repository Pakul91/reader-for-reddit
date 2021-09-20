import React from "react";
import "./DetailedView.css";
import { useDispatch } from "react-redux";
import { toggleDatailedViewById } from "../../searchResults/searchResultsSlice";
//===========================================

export function DetailedView({ post }) {
  const dispatch = useDispatch();
  //Turn detailed view off when clicked on overlay or X button
  const handleClick = () => [dispatch(toggleDatailedViewById(post.id))];

  return (
    <div>
      <div className="details-container">
        <h2>{post.title}</h2>
      </div>
      <div className="overlay" onClick={handleClick}></div>
    </div>
  );
}
