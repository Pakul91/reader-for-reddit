import { createSlice } from "@reduxjs/toolkit";

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: [
    {
      name: "GodofWar",
      id: "2ts07",
      img: "https://b.thumbs.redditmedia.com/0PZypzmLx5Vc1bafTNnaRjlcKQC9kHyuPUTZje1aU6U.png",
      active: false,
    },
    {
      name: "reactjs",
      id: "2zldd",
      img: "https://b.thumbs.redditmedia.com/5AK7GoOGvz6ILKV3revM3Vz5YcPj0cPf-J-QGgFSduc.png",
      active: false,
    },
    {
      name: "ffxiv",
      id: "2rgs7",
      img: "https://b.thumbs.redditmedia.com/nBTVKwioFs8qMyW6FO38S5MybIUOAKUovjsGgrkNN_U.png",
      active: true,
    },
  ],
  reducers: {
    addSubreddit: (state, action) => {},
  },
});

export const selectSubreddits = (state) => state.subreddits;
export default subredditsSlice.reducer;
