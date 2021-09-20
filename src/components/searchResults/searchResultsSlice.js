import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../API/redditAPI";
import { formatPosts } from "../../HELPERS";

// ========== ENDPOINTS FOR FETCHING ============

// search for subreddits
// const endpoint = `search.json?q=${term}&type=sr%2Cuser`;

// search for posts
// const endpoint = `search.json?q=${term}&type=link`;

// load specific subreddit:
// const endpoint = `/r/${subreddit}.json`;

// serch for top categories (hot/new/top(for today)/rising):
// const endpoint = `${category}.json`;

// Load post by search term using fetchData() from API module.
export const loadPostBySearchTerm = createAsyncThunk(
  "searchResults/loadPostBySearchTerm",
  async (term) => {
    const endpoint = `search.json?q=${term}&type=link`;
    const posts = await fetchData(endpoint);

    return formatPosts(posts);
  }
);

const searchResultsSlice = createSlice({
  name: "serchResults",
  initialState: {
    posts: [],
    subreddits: [],
    isLoadingPosts: false,
    failedToLoadPosts: false,
    isLoadingSubreddits: false,
    failedToLoadSubreddits: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPostBySearchTerm.pending, (state) => {
        state.isLoadingPosts = true;
        state.failedToLoadPosts = false;
      })
      .addCase(loadPostBySearchTerm.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = false;
        state.posts = action.payload;
      })
      .addCase(loadPostBySearchTerm.rejected, (state) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = true;
      });
  },
});

//Post selector
export const selectSearchedPosts = (state) => state.searchResults.posts;
//Subreddits selector
export const selectSearchedSubreddits = (state) =>
  state.searchResults.subreddits;
export default searchResultsSlice.reducer;
