import React from "react";
import { useDispatch } from "react-redux";
import { formatNumber } from "../../Helpers/HELPERS";
import { media } from "../../media/media";
import {
  setAllInactive,
  setActiveById,
} from "../subredditsPanel/subredditsSlice";
import { loadPosts } from "./searchResultsSlice";
import { toggleContent } from "../QuickAccessBar/quickAccessBarSlice";

export function SubredditSearchResult({ subreddit }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    //set all featured subreddits to inactive state
    dispatch(setAllInactive());
    //if clicked Subreddit ID is among featured subreddits, select its status to active
    dispatch(setActiveById(subreddit.id));
    //load subredit posts
    dispatch(loadPosts({ term: subreddit.name, type: "subredditPosts" }));
    //activate posts button
    dispatch(toggleContent());
  };

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
