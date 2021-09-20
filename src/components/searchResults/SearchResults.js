import React from "react";
import { useSelector } from "react-redux";
import { SearchResult } from "./SearchResult";
import { LoadingSpinner } from "../loadingSpinner/LoadingSpinner";
import {
  selectSearchedPosts,
  selectIsLoadingPosts,
} from "./searchResultsSlice";
import "./SearchResults.css";

export function SearchResults() {
  //Loaded posts
  const posts = useSelector(selectSearchedPosts);
  const loading = useSelector(selectIsLoadingPosts);

  return (
    <div className="searchResults-container">
      {loading && <LoadingSpinner />}
      {posts.map((post) => {
        return <SearchResult key={post.id} post={post} />;
      })}
    </div>
  );
}
