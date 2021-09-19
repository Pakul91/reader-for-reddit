import { AsyncThunk, createSlice } from "@reduxjs/toolkit";

const searchResultsSlice = createSlice({
  name: "serchResults",
  initialState: {
    posts: [],
    subreddits: [],
  },
  reducers: {},
});

export const selectSearchResults = (state) => state.searchResults;
export default searchResultsSlice.reducer;
