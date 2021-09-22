import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchComments } from "../../../../API/redditAPI";

//Load comments from the API
export const loadComments = createAsyncThunk(
  "comments/loadCommentsByPostId",
  async function ({ id, permalink }) {
    try {
      const comments = await fetchComments(permalink);

      //format extrcted comments
      const formatedComments = comments.data.children.map(({ data }) => {
        return {
          author: data.author,
          body: data.body,
          created: data.created,
          id: data.id,
        };

        // return object containing post id as a key and comments array as a body
      });
      return { [id]: formatedComments };
    } catch (error) {
      return error.message;
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},
    commentsLoading: false,
    failedToLoadComments: false,
  },
  reducers: {
    /**
     * check if comments for given post are already loaded.
     * @param {object} state
     * @param {string} action  / post id to check agains the comments object
     */
    alreadyLoaded: (state, action) => {
      return state.comments[action.payload] ? true : false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadComments.pending, (state) => {
        state.commentsLoading = true;
        state.failedToLoadComments = false;
      })
      .addCase(loadComments.fulfilled, (state, action) => {
        state.commentsLoading = false;
        state.failedToLoadComments = false;

        state.comments = { ...state.comments, ...action.payload };
      })
      .addCase(loadComments.rejected, (state) => {
        state.commentsLoading = false;
        state.failedToLoadComments = true;
      });
  },
});

// selectors
export const selectComments = (state) => state.comments.comments;
//action creators
export const { alreadyLoaded } = commentsSlice.actions;
//reducer
export default commentsSlice.reducer;
