import { createSlice } from "@reduxjs/toolkit";

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {},
  reducers: {
    addSubreddit: (state, action) => {},
  },
});

export const selectSubreddits = (state) => state.subreddits;
export default subredditsSlice.reducer;
