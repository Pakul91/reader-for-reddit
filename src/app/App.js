import { React, useEffect } from "react";
import { useDispatch } from "react-redux";

import "./reset.css";
import "./App.css";
import { Header } from "../components/header/Header";

import { SearchResults } from "../components/searchResults/SearchResults";
import { SubredditsPanel } from "../components/subredditsPanel/SubredditsPanel";
import { loadPosts } from "../components/searchResults/searchResultsSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPosts({ term: "hot", type: "category" }));
  }, [dispatch]);

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
