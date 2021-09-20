import React from "react";
import { useSelector } from "react-redux";
import { selectSubreddits } from "./subredditsSlice";
import { Subreddit } from "./Subreddit";
import "./SubredditsPanel.css";

export function SubredditsPanel() {
  const subreddits = useSelector(selectSubreddits);

  return (
    <div className="subredditPanel-container">
      <h2>Featured subreddits:</h2>
      {subreddits.map((subreddit) => {
        return <Subreddit subreddit={subreddit} key={subreddit.id} />;
      })}
    </div>
  );
}
