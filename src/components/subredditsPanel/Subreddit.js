import React from "react";

export function Subreddit({ subreddit }) {
  return (
    <div className={`subreddit-container ${subreddit.active ? "active" : ""}`}>
      <div className="subreddit-img">
        <img src={subreddit.img} alt="" />
      </div>
      <span>{subreddit.name}</span>
    </div>
  );
}
