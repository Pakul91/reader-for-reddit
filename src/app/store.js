import { configureStore } from "@reduxjs/toolkit";
import subredditsSlice from "../components/subredditsPanel/subredditsSlice";

export const store = configureStore({
  reducer: {
    subreddits: subredditsSlice,
  },
});
