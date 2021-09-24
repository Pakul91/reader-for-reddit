import React from "react";
import { useDispatch } from "react-redux";
import { formatNumber } from "../../Helpers/HELPERS";
import { media } from "../../media/media";

export function SubredditSearchResult({ subreddit }) {
  const dispatch = useDispatch();

  const handleClick = () => {};

  return (
    <div>
      <div className="subredditSearchResult-container" onClick={handleClick}>
        <div className="subreddit-icon-subsribers">
          <div className="subreddit-icon">
            <img
              src={subreddit.img || media.userIcon}
              alt="subreddit img"
            ></img>
          </div>
          <div className="subreddit-subsribers">
            {formatNumber(subreddit.subscribers)} subscribers
          </div>
        </div>
        <div className="description-container">{subreddit.description}</div>
      </div>
    </div>
  );
}
