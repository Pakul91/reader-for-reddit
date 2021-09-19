import React from "react";
import "./SearchResults.css";
import textIcon from "../../media/textIcon.png";

export function SearchResult({ post }) {
  const formatUps = function ({ ups }) {
    if (ups < 1000) return ups;

    const thousands = Math.floor(ups / 1000);
    const decimal = Math.floor((ups % 1000) / 100);
    console.log(decimal);
    const display = `${thousands}${decimal ? `.${decimal}` : ""}k`;
    return display;
  };
  const formatTime = function ({ created }) {};
  return (
    <div className="searchResult-container">
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
        <span className="date-stamp">Posted: {post.created} ago.</span>
      </div>
    </div>
  );
}
