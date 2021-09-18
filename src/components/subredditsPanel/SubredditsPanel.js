import React from "react";
import { Subreddit } from "./Subreddit";

import "./SubredditsPanel.css";

export function SubredditsPanel() {
  return (
    <div className="subredditPanel-container">
      <h2>Featured subreddits:</h2>
      <Subreddit />
      <Subreddit />
      <Subreddit />
    </div>
  );
}
