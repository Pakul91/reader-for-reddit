import React, { useState } from "react";
import "./DetailedView.css";
import linkIcon from "../../../media/linkIcon.png";
import { useDispatch } from "react-redux";
import { toggleDatailedViewById } from "../../searchResults/searchResultsSlice";
import { formatTime, formatUps } from "../../../HELPERS";

//===========================================

export function DetailedView({ post }) {
  const [brokenImg, setBrokenImg] = useState(false);

  const dispatch = useDispatch();
  //Turn detailed view off when clicked on overlay or X button
  const handleClick = () => [dispatch(toggleDatailedViewById(post.id))];

  const onBrokenImg = (e) => {
    e.target.style.display = "none";
    setBrokenImg(true);
  };

  return (
    <div>
      <div className="details-container">
        <h2>{post.title}</h2>
        <img src={post.mediaURL} onError={onBrokenImg} alt="media" />
        {/* IF IMG IS BROKEN, DISPLAY LINK ICON */}
        {brokenImg ? (
          <a href={post.mediaURL} target="_blank" rel="noreferrer">
            <img src={linkIcon} alt="" />
          </a>
        ) : (
          ""
        )}
        <p>{post.text}</p>
        <span>{post.author}</span>
        <span>{formatTime(post.created)}</span>
      </div>
      <div className="overlay" onClick={handleClick}></div>
    </div>
  );
}
