import React from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../searchResults/searchResultsSlice";
import { setActiveById, setAllInactive } from "./subredditsSlice";
import {
  setAllToUnselected,
  setToSelectedById,
  setToDisabledById,
} from "../QuickAccessBar/quickAccessBarSlice";

export function Subreddit({ subreddit }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    //set all featured subreddits to inactive state
    dispatch(setAllInactive());
    //set selected subreddit state to active
    dispatch(setActiveById(subreddit.id));
    //load subreddit posts
    dispatch(loadPosts({ term: subreddit.name, type: "subredditPosts" }));
    //set all quick access bar buttons to inactive
    dispatch(setAllToUnselected());
    //select Posts button to view posts
    dispatch(setToSelectedById("posts"));
    //set subreddits button state to disabled
    dispatch(setToDisabledById("subreddits"));
  };

  return (
    <div
      className={`subreddit-container ${subreddit.active ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className="subreddit-img">
        <img src={subreddit.img} alt="" />
      </div>
      <span>{subreddit.name}</span>
    </div>
  );
}
