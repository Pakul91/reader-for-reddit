import React from "react";
import { useDispatch } from "react-redux";
//Files media and components
import "./SearchResults.css";
import textIcon from "../../media/textIcon.png";
import { DetailedView } from "./DetailedView/DetailedView";
// Functions
import { formatTime, formatNumber } from "../../Helpers/HELPERS";
import { toggleDatailedViewById } from "./searchResultsSlice";

//======================================

export function PostSearchResult({ post }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(toggleDatailedViewById(post.id));
  };

  return (
    <div>
      <div className="postSearchResult-container" onClick={handleClick}>
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
      </div>
      {post.detailedView && <DetailedView post={post} />}
    </div>
  );
}
