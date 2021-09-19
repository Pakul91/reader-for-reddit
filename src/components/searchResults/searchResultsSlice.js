import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchForPosts } from "../../API/redditAPI";

// Load post by search term using searchForPosts() from API module.
export const loadPostBySearchTerm = createAsyncThunk(
  "searchResults/loadPostBySearchTerm",
  async (term) => {
    const posts = await searchForPosts(term);
    // Format and return retrieved data
    const formatedPosts = posts.data.children.map(({ data }) => {
      return {
        id: data.id,
        author: data.author,
        created: data.created,
        subreddit: data.subreddit,
        subredditId: data.subreddit_id,
        title: data.title,
        thumbnai: data.thumbnail,
        ups: data.ups,
        mediaURL: data.url,
        permalink: data.permalink,
        text: data.selftext,
        datailedView: false,
      };
    });

    console.log(formatedPosts);
    return formatedPosts;
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
