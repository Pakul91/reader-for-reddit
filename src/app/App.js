import React from "react";
import "./reset.css";
import "./App.css";
import { Header } from "../components/header/Header";
import { SearchResults } from "../components/searchResults/SearchResults";
import { SubredditsPanel } from "../components/subredditsPanel/SubredditsPanel";

import { searchForSubreddit } from "../API/redditAPI";

function App() {
  searchForSubreddit("reactjs");
  return (
    <div className="app-container">
      <Header />
      <main>
        <SearchResults />
        <SubredditsPanel />
      </main>
    </div>
  );
}

export default App;
