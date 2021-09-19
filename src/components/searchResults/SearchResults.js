import React from "react";
import { useSelector } from "react-redux";
import { SearchResult } from "./SearchResult";
import { selectSearchedPosts } from "./searchResultsSlice";
import "./SearchResults.css";

export function SearchResults() {
  //Loaded posts
  const posts = useSelector(selectSearchedPosts);
  return (
    <div className="searchResults-container">
      {posts.map((post) => {
        return <SearchResult key={post.id} post={post} />;
      })}
    </div>
  );
}
