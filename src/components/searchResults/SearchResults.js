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
  selectSearchTerm,
  selectSearchedPosts,
  selectIsLoadingPosts,
  selectFailedToLoadPosts,
  selectPostsError,
  selectSearchedSubreddits,
  selectIsLoadingSubreddits,
  selectFailedToLoadSubreddits,
  selectSubredditsError,
} from "./searchResultsSlice";
import "./SearchResults.css";
import { QuickAccessBar } from "../QuickAccessBar/QuickAccessBar";
import { ErrorBox } from "../ErrorBox/ErrorBox";

export function SearchResults() {
  //Search term selector
  const searchTerm = useSelector(selectSearchTerm);
  //Posts selectors
  const posts = useSelector(selectSearchedPosts);
  const postsLoading = useSelector(selectIsLoadingPosts);
  const postsActive = useSelector(selectPostsButtonStatus);
  const failedToLoadPosts = useSelector(selectFailedToLoadPosts);
  const postsErrorMsg = useSelector(selectPostsError);
  const displayPosts = !postsLoading && !failedToLoadPosts && postsActive;
  //Subreddits selectors
  const subreddits = useSelector(selectSearchedSubreddits);
  const subredditsLoading = useSelector(selectIsLoadingSubreddits);
  const subredditsActive = useSelector(selectSubredditsButtonStatus);
  const failedToLoadSubreddits = useSelector(selectFailedToLoadSubreddits);
  const subredditsErrorMsg = useSelector(selectSubredditsError);
  const displaySubreddits =
    !subredditsLoading && !failedToLoadSubreddits && subredditsActive;

  return (
    <div className="searchResults-container">
      <QuickAccessBar />

      {/* -----------POSTS----------- */}
      {/* Load error msg if not loading and error */}
      {postsActive && !postsLoading && failedToLoadPosts && (
        <ErrorBox error={postsErrorMsg} />
      )}
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
      {/* Reder posts if coditions met*/}
      {displayPosts &&
        Object.values(posts).map((post) => {
          return <PostSearchResult key={post.id} post={post} />;
        })}

      {/* -----------SUBREDDITS----------- */}
      {/* When subreddits button selected and searchTerm provided display label with search term */}
      {/* Load error msg if not loading and error */}
      {subredditsActive && !subredditsLoading && failedToLoadPosts && (
        <ErrorBox error={subredditsErrorMsg} />
      )}
      {displaySubreddits && (
        <div className="search-term-display">
          <p>
            Subreddits for: <span>'{searchTerm}'</span>
          </p>
        </div>
      )}
      {/* Reder subreddits if conditions met*/}
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
