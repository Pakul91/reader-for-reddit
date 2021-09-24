import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../API/redditAPI";
import { formatPosts, formatSubreddits } from "../../Helpers/HELPERS";

// ========== ENDPOINTS FOR FETCHING ============

// search for subreddits
// const endpoint = `search.json?q=${term}&type=sr%2Cuser`;

// search for posts
// const endpoint = `search.json?q=${term}&type=link`;

// load specific subreddit posts:
// const endpoint = `r/${subreddit}.json`;

// serch for top categories (hot/new/top(for today)/rising):
// const endpoint = `${category}.json`;

/*
Load posts will accept and object:
{
  term: search term/category/subreddit name provided ('category' will accept hot/new/top/rising), 
  type: specyfies what endpoint to use (will accept searchTerm/category/subredditPosts )
}
*/

/**
 *
 */
export const loadPosts = createAsyncThunk(
  "searchResults/loadPostBySearchTerm",
  async ({ term, type }) => {
    try {
      let endpoint;

      if (type === "searchTerm") {
        endpoint = `search.json?q=${term}&type=link`;
      }
      if (type === "category") {
        endpoint = `${term}.json`;
      }
      if (type === "subredditPosts") {
        endpoint = `r/${term}.json`;
      }

      const posts = await fetchData(endpoint);

      //expect Object as returned value
      return formatPosts(posts);
    } catch (error) {
      return error.message;
    }
  }
);

export const loadSubreddits = createAsyncThunk(
  "searchResults/loadSubredditsBySearchTerm",
  async (term) => {
    const endpoint = `search.json?q=${term}&type=sr%2Cuser`;

    const subreddits = await fetchData(endpoint);

    return formatSubreddits(subreddits);
  }
);

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    posts: {},
    subreddits: {},
    postsActive: true,
    subredditsActive: false,
    isLoadingPosts: false,
    failedToLoadPosts: false,
    isLoadingSubreddits: false,
    failedToLoadSubreddits: false,
  },
  reducers: {
    //Toggle clicked detailed view. Will accept post ID as action.payload
    toggleDatailedViewById: (state, action) => {
      const post = state.posts[action.payload];

      post.detailedView
        ? (post.detailedView = false)
        : (post.detailedView = true);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoadingPosts = true;
        state.failedToLoadPosts = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state) => {
        state.isLoadingPosts = false;
        state.failedToLoadPosts = true;
      })
      .addCase(loadSubreddits.pending, (state) => {
        state.isLoadingSubreddits = true;
        state.failedToLoadSubreddits = false;
      })
      .addCase(loadSubreddits.fulfilled, (state, action) => {
        state.isLoadingSubreddits = false;
        state.failedToLoadSubreddits = false;
        state.subreddits = action.payload;
      })
      .addCase(loadSubreddits.rejected, (state) => {
        state.isLoadingSubreddits = false;
        state.failedToLoadSubreddits = true;
      });
  },
});

//Post selectors
export const selectSearchedPosts = (state) => state.searchResults.posts;
export const selectIsLoadingPosts = (state) =>
  state.searchResults.isLoadingPosts;

//Subreddits selectors
export const selectSearchedSubreddits = (state) =>
  state.searchResults.subreddits;
export const selectIsLoadingSubreddits = (state) =>
  state.searchResults.isLoadingSubreddits;

//Action creators exports
export const { toggleDatailedViewById } = searchResultsSlice.actions;

//Reducer export
export default searchResultsSlice.reducer;
