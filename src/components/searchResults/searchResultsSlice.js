import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../API/redditAPI";
import {
  formatPosts,
  formatSubreddits,
  formatTerm,
} from "../../Helpers/HELPERS";

import {
  setAllInactive,
  setActiveById,
} from "../subredditsPanel/subredditsSlice";

import {
  setToDisabledById,
  toggleContent,
} from "../QuickAccessBar/quickAccessBarSlice";

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
export const loadPosts = createAsyncThunk(
  "searchResults/loadPostBySearchTerm",
  async ({ term, type }) => {
    let endpoint;

    if (type === "searchTerm") {
      endpoint = `search.json?q=${formatTerm(term)}&type=link`;
    }
    if (type === "category") {
      endpoint = `${formatTerm(term)}.json`;
    }
    if (type === "subredditPosts") {
      endpoint = `r/${formatTerm(term)}.json`;
    }

    const posts = await fetchData(endpoint);

    if (posts.data.children.length === 0)
      throw new Error(`Couldn't find any posts for '${term}'`);

    //expect Object as returned value
    return formatPosts(posts);
  }
);

// Load post for given subreddits from categories hot/top/new/rising
/**
 * @param {string} term | search term
 * @param {string} category | category name to be displayed
 */
export const loadSubredditPostsByCategory = createAsyncThunk(
  "searchResults/loadPostBySearchTerm",
  async ({ term, category }) => {
    const endpoint = `r/${term}/${category}.json`;
    const posts = await fetchData(endpoint);

    //expect Object as returned value
    return formatPosts(posts);
  }
);

export const loadSubreddits = createAsyncThunk(
  "searchResults/loadSubredditsBySearchTerm",
  async (term) => {
    const endpoint = `search.json?q=${term}&type=sr%2Cuser`;

    const subreddits = await fetchData(endpoint);

    console.log(subreddits);

    if (!subreddits.data || subreddits.data.children.length === 0)
      throw new Error(`Couldn't find any subreddits for '${term}'`);

    return formatSubreddits(subreddits);
  }
);

export const subredditClick = (subreddit) => {
  return (dispatch) => {
    //set all featured subreddits to inactive state
    dispatch(setAllInactive());
    //if clicked Subreddit ID is among featured subreddits, select its status to active
    dispatch(setActiveById(subreddit.id));
    //set serarch term to 'r/' prefixed subreddit name
    dispatch(setSearchTerm(`r/${subreddit.name}`));
    //load subredit posts
    dispatch(loadPosts({ term: subreddit.name, type: "subredditPosts" }));
    //activate posts button
    dispatch(toggleContent());
    //set subreddits button state to disabled
    dispatch(setToDisabledById("subreddits"));
  };
};

const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    posts: {},
    subreddits: {},
    searchTerm: "",

    loadingData: false,
    failedToLoadPosts: false,
    failedToLoadSubreddits: false,
    postsError: "",
    subredditsError: "",
  },
  reducers: {
    //Store search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    //Set posts and subreddits to an empty {}
    clearData: (state) => {
      state.posts = {};
      state.subreddits = {};
    },
    //Toggle clicked detailed view. Will accept post ID as action.payload
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loadingData = true;
        state.failedToLoadPosts = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loadingData = false;
        state.failedToLoadPosts = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loadingData = false;
        state.failedToLoadPosts = true;
        state.postsError = action.error.message;
      })
      .addCase(loadSubreddits.pending, (state) => {
        state.loadingData = true;
        state.failedToLoadSubreddits = false;
      })
      .addCase(loadSubreddits.fulfilled, (state, action) => {
        state.loadingData = false;
        state.failedToLoadSubreddits = false;
        state.subreddits = action.payload;
      })
      .addCase(loadSubreddits.rejected, (state, action) => {
        state.loadingData = false;
        state.failedToLoadSubreddits = true;
        state.subredditsError = action.error.message;
      });
  },
});

export const selectSearchTerm = (state) => state.searchResults.searchTerm;
export const selectLoadingData = (state) => state.searchResults.loadingData;

export const selectSearchedPosts = (state) => state.searchResults.posts;
export const selectFailedToLoadPosts = (state) =>
  state.searchResults.failedToLoadPosts;
export const selectPostsError = (state) => state.searchResults.postsError;

export const selectSearchedSubreddits = (state) =>
  state.searchResults.subreddits;
export const selectFailedToLoadSubreddits = (state) =>
  state.searchResults.failedToLoadSubreddits;
export const selectSubredditsError = (state) =>
  state.searchResults.subredditsError;

//Action creators exports
export const { toggleDatailedViewById, setSearchTerm, clearData } =
  searchResultsSlice.actions;

//Reducer export
export default searchResultsSlice.reducer;
