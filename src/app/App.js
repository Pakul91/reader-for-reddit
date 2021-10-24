import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

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
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <SearchResults />
          <SubredditsPanel />
        </main>
      </div>
    </Router>
  );
}

export default App;
