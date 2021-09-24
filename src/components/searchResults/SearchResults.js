import React from "react";
import { useSelector } from "react-redux";
import { PostSearchResult } from "./PostSearchResult";
import { SubredditSearchResult } from "./SubredditSearchResult";
import {
  selectPostsButtonStatus,
  selectSubredditsButtonStatus,
} from "../QuickAccessBar/quickAccessBarSlice";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
import {
  selectSearchedPosts,
  selectIsLoadingPosts,
  selectSearchedSubreddits,
  selectIsLoadingSubreddits,
} from "./searchResultsSlice";
import "./SearchResults.css";

export function SearchResults() {
  //Posts selectors
  const posts = useSelector(selectSearchedPosts);
  const postsLoading = useSelector(selectIsLoadingPosts);
  const postsActive = useSelector(selectPostsButtonStatus);

  //Subreddits selectors
  const subreddits = useSelector(selectSearchedSubreddits);
  const subredditsLoading = useSelector(selectIsLoadingSubreddits);
  const subredditsActive = useSelector(selectSubredditsButtonStatus);

  return (
    <div className="searchResults-container">
      {/* If loading render spinner */}
      {postsLoading && <LoadingSpinner />}

      {/* If Posts button selected and posts are not loading, redenr posts*/}
      {!postsLoading &&
        postsActive &&
        Object.values(posts).map((post) => {
          return <PostSearchResult key={post.id} post={post} />;
        })}

      {/* If Subreddits button selected and subreddits are not loading, redenr subreddits*/}
      {!subredditsLoading &&
        subredditsActive &&
        Object.values(subreddits).map((subreddit) => {
          return (
            <SubredditSearchResult key={subreddit.id} subreddit={subreddit} />
          );
        })}
    </div>
  );
}
