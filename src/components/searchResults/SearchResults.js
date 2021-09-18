import React from "react";
import { SearchResult } from "./SearchResult";
import "./SearchResults.css";

export function SearchResults() {
  return (
    <div className="searchResults-container">
      <SearchResult />
      <SearchResult />
      <SearchResult />
    </div>
  );
}
