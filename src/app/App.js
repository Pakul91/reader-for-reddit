import { React, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./reset.css";
import "./App.css";
import { Header } from "../components/header/Header";
import { SearchResults } from "../components/searchResults/SearchResults";
import { SubredditsPanel } from "../components/subredditsPanel/SubredditsPanel";
import { loadPostBySearchTerm } from "../components/searchResults/searchResultsSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("loaded");
    dispatch(loadPostBySearchTerm("popular"));
  }, []);

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
