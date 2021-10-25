import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

import { featuredSubredditClick } from "./subredditsSlice";

export function Subreddit({ subreddit }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(featuredSubredditClick(subreddit));
    history.push("/posts");
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
