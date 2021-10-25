import React from "react";
//Files media and components
import "./SearchResults.css";
import textIcon from "../../media/textIcon.png";
import { DetailedView } from "./DetailedView/DetailedView";
// Functions
import { formatTime, formatNumber } from "../../Helpers/HELPERS";
import { Link, Route } from "react-router-dom";

//======================================

export function PostSearchResult({ post }) {
  return (
    <div>
      <Link to={`/posts/${post.id}`} className="postSearchResult-container">
        <div className="ups">{formatNumber(post.ups)}</div>
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
          <div>
            <span className="author">{post.author}</span>
            <span className="date-stamp"> {formatTime(post)} ago.</span>
          </div>
        </div>
      </Link>
      <Route path={`/posts/${post.id}`}>
        <DetailedView post={post} />
      </Route>
    </div>
  );
}
