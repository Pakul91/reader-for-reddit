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

  // const link = `<iframe
  //     width="356"
  //     height="200"
  //     src="https://www.youtube.com/embed/K7Yn4m567sk?feature=oembed&amp;enablejsapi=1"
  //     frameborder="0"
  //     allow="accelerometer; autoplay; clipboard-write;
  // encrypted-media; gyroscope; picture-in-picture"
  //     allowfullscreen
  //   ></iframe>`;

  return (
    <div className="app-container">
      {/* <div dangerouslySetInnerHTML={{ __html: link }}></div> */}
      <Header />
      <main>
        <SearchResults />
        <SubredditsPanel />
      </main>
    </div>
  );
}

export default App;
