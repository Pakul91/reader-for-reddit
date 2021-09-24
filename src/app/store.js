import { configureStore } from "@reduxjs/toolkit";
import subredditsSlice from "../components/subredditsPanel/subredditsSlice";
import searchResultsSlice from "../components/searchResults/searchResultsSlice";
import commentsSlice from "../components/searchResults/DetailedView/Comments/commentsSlice";
import quickAccessBarSlice from "../components/QuickAccessBar/quickAccessBarSlice";

export const store = configureStore({
  reducer: {
    quickAccessBar: quickAccessBarSlice,
    subreddits: subredditsSlice,
    searchResults: searchResultsSlice,
    comments: commentsSlice,
  },
});
