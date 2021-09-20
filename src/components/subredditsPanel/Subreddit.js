import React from "react";
import { useDispatch } from "react-redux";
import { loadPosts } from "../searchResults/searchResultsSlice";
import { setActiveById, setAllInactive } from "./subredditsSlice";

export function Subreddit({ subreddit }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setAllInactive());
    dispatch(setActiveById(subreddit.id));
    dispatch(loadPosts({ term: subreddit.name, type: "subredditPosts" }));
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
