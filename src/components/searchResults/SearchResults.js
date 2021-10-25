import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import { PostSearchResult } from "./PostSearchResult";
import { SubredditSearchResult } from "./SubredditSearchResult";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
import {
  selectSearchTerm,
  selectSearchedPosts,
  selectSearchedSubreddits,
  selectLoadingData,
  selectFailedToLoadPosts,
  selectFailedToLoadSubreddits,
  selectPostsError,
  selectSubredditsError,
} from "./searchResultsSlice";
import "./SearchResults.css";
import { QuickAccessBar } from "../QuickAccessBar/QuickAccessBar";
import { ErrorBox } from "../ErrorBox/ErrorBox";

export function SearchResults() {
  const searchTerm = useSelector(selectSearchTerm);
  const posts = useSelector(selectSearchedPosts);
  const subreddits = useSelector(selectSearchedSubreddits);
  const loadingData = useSelector(selectLoadingData);
  const failedToLoadSubreddits = useSelector(selectFailedToLoadSubreddits);
  const failedToLoadPosts = useSelector(selectFailedToLoadPosts);
  const postsError = useSelector(selectPostsError);
  const subredditsError = useSelector(selectSubredditsError);

  if (loadingData) {
    return (
      <div className="searchResults-container">
        <QuickAccessBar />
        <LoadingSpinner />
      </div>
    );
  }

  const postsContent = () => {
    if (failedToLoadPosts) {
      return (
        <Route path="/posts">
          <ErrorBox error={postsError} />
        </Route>
      );
    } else {
      return (
        <Route path="/posts">
          {searchTerm && (
            <div className="search-term-display">
              <p>
                Posts for: <span>'{searchTerm}'</span>
              </p>
            </div>
          )}
          {Object.values(posts).map((post) => {
            return <PostSearchResult key={post.id} post={post} />;
          })}
        </Route>
      );
    }
  };

  const subredditsContent = () => {
    if (failedToLoadSubreddits) {
      return (
        <Route path="/subreddits">
          <ErrorBox error={subredditsError} />
        </Route>
      );
    } else {
      return (
        <Route path="/subreddits">
          <div className="search-term-display">
            <p>
              Subreddits for: <span>'{searchTerm}'</span>
            </p>
          </div>
          {Object.values(subreddits).map((subreddit) => {
            return (
              <SubredditSearchResult key={subreddit.id} subreddit={subreddit} />
            );
          })}
        </Route>
      );
    }
  };

  return (
    <div className="searchResults-container">
      <QuickAccessBar />
      {postsContent()}
      {subredditsContent()}
    </div>
  );
}
