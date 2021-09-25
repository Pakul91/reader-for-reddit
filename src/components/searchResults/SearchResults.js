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
  selectSearchTerm,
} from "./searchResultsSlice";
import "./SearchResults.css";
import { QuickAccessBar } from "../QuickAccessBar/QuickAccessBar";

export function SearchResults() {
  //Search term selector
  const searchTerm = useSelector(selectSearchTerm);
  //Posts selectors
  const posts = useSelector(selectSearchedPosts);
  const postsLoading = useSelector(selectIsLoadingPosts);
  const postsActive = useSelector(selectPostsButtonStatus);
  const displayPosts = !postsLoading && postsActive;
  //Subreddits selectors
  const subreddits = useSelector(selectSearchedSubreddits);
  const subredditsLoading = useSelector(selectIsLoadingSubreddits);
  const subredditsActive = useSelector(selectSubredditsButtonStatus);
  const displaySubreddits = !subredditsLoading && subredditsActive;

  return (
    <div className="searchResults-container">
      <QuickAccessBar />
      {/* If loading render spinner */}
      {postsLoading && <LoadingSpinner />}

      {/* When subreddits button selected and searchTerm provided  display label with search term */}
      {displayPosts && searchTerm && (
        <div className="search-term-display">
          <p>
            Posts for: <span>'{searchTerm}'</span>
          </p>
        </div>
      )}

      {/* If Posts button selected and posts are not loading, redenr posts*/}
      {displayPosts &&
        Object.values(posts).map((post) => {
          return <PostSearchResult key={post.id} post={post} />;
        })}

      {/* When subreddits button selected and searchTerm provided display label with search term */}
      {displaySubreddits && (
        <div className="search-term-display">
          <p>
            Subreddits for: <span>'{searchTerm}'</span>
          </p>
        </div>
      )}
      {/* If Subreddits button selected and subreddits are not loading, reder  subreddits*/}
      {displaySubreddits &&
        searchTerm &&
        Object.values(subreddits).map((subreddit) => {
          return (
            <SubredditSearchResult key={subreddit.id} subreddit={subreddit} />
          );
        })}
    </div>
  );
}
