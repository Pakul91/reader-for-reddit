import { configureStore } from "@reduxjs/toolkit";
import subredditsSlice from "../components/subredditsPanel/subredditsSlice";
import searchResultsSlice from "../components/searchResults/searchResultsSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditsSlice,
    searchResults: searchResultsSlice,
  },
});
