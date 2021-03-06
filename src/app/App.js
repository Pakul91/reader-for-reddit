import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./reset.css";
import "./App.css";
import { Header } from "../components/header/Header";

import { SearchResults } from "../components/searchResults/SearchResults";
import { SubredditsPanel } from "../components/subredditsPanel/SubredditsPanel";
import { loadPosts } from "../components/searchResults/searchResultsSlice";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    history.push("/posts");
    dispatch(loadPosts({ term: "hot", type: "category" }));
  }, [history, dispatch]);

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
