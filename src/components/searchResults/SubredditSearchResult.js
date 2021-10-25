import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { formatNumber } from "../../Helpers/HELPERS";
import { media } from "../../media/media";
import { subredditClick } from "./searchResultsSlice";

export function SubredditSearchResult({ subreddit }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(subredditClick(subreddit));
    history.push("/posts");
  };

  return (
    <div>
      <div className="subredditSearchResult-container" onClick={handleClick}>
        <div className="subreddit-icon-container">
          <img src={subreddit.img || media.userIcon} alt="subreddit img"></img>
        </div>
        <div className="subreddit-info-container">
          <p className="subreddit-name">{subreddit.name}</p>
          <p className="subreddit-subsribers">
            {formatNumber(subreddit.subscribers)} subs
          </p>
        </div>
        <div className="description-container">{subreddit.description}</div>
      </div>
    </div>
  );
}
