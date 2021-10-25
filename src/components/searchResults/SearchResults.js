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
  selectFailedToLoadData,
  selectDataError,
} from "./searchResultsSlice";
import "./SearchResults.css";
import { QuickAccessBar } from "../QuickAccessBar/QuickAccessBar";
import { ErrorBox } from "../ErrorBox/ErrorBox";

export function SearchResults() {
  const searchTerm = useSelector(selectSearchTerm);
  const posts = useSelector(selectSearchedPosts);
  const subreddits = useSelector(selectSearchedSubreddits);
  const loadingData = useSelector(selectLoadingData);
  const failedToLoadData = useSelector(selectFailedToLoadData);
  const dataError = useSelector(selectDataError);

  if (loadingData) {
    return (
      <div className="searchResults-container">
        <QuickAccessBar />
        <LoadingSpinner />
      </div>
    );
  }

  if (failedToLoadData) {
    return (
      <div className="searchResults-container">
        <QuickAccessBar />
        <ErrorBox error={dataError} />
      </div>
    );
  }

  return (
    <div className="searchResults-container">
      <QuickAccessBar />

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
      {/* -----------SUBREDDITS----------- */}

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
    </div>
  );
}
