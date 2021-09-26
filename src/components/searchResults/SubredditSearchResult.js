import React from "react";
import { useDispatch } from "react-redux";
import { formatNumber } from "../../Helpers/HELPERS";
import { media } from "../../media/media";
import {
  setAllInactive,
  setActiveById,
} from "../subredditsPanel/subredditsSlice";
import { loadPosts, setSearchTerm } from "./searchResultsSlice";
import {
  toggleContent,
  setToDisabledById,
} from "../QuickAccessBar/quickAccessBarSlice";

export function SubredditSearchResult({ subreddit }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    //set all featured subreddits to inactive state
    dispatch(setAllInactive());
    //if clicked Subreddit ID is among featured subreddits, select its status to active
    dispatch(setActiveById(subreddit.id));
    //set serarch term to 'r/' prefixed subreddit name
    dispatch(setSearchTerm(`r/${subreddit.name}`));
    //load subredit posts
    dispatch(loadPosts({ term: subreddit.name, type: "subredditPosts" }));
    //activate posts button
    dispatch(toggleContent());
    //set subreddits button state to disabled
    dispatch(setToDisabledById("subreddits"));
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
