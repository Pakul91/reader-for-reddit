import { configureStore } from "@reduxjs/toolkit";
import subredditsSlice from "../components/subredditsPanel/subredditsSlice";
import searchResultsSlice from "../components/searchResults/searchResultsSlice";
import commentsSlice from "../components/searchResults/DetailedView/Comments/commentsSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditsSlice,
    searchResults: searchResultsSlice,
    comments: commentsSlice,
  },
});
