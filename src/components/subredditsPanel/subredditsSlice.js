import { createSlice } from "@reduxjs/toolkit";
import { media } from "../../media/media";
import {
  clearData,
  loadPosts,
  setSearchTerm,
} from "../searchResults/searchResultsSlice";
import {
  setAllToUnselected,
  setToSelectedById,
  setToDisabledById,
} from "../QuickAccessBar/quickAccessBarSlice";

export const featuredSubredditClick = (subreddit) => {
  return (dispatch) => {
    //Clear previos search results
    dispatch(clearData());
    //set all featured subreddits to inactive state
    dispatch(setAllInactive());
    //set serarch term to 'r/' prefixed subreddit name
    dispatch(setSearchTerm(`r/${subreddit.name}`));
    //set selected subreddit state to active
    dispatch(setActiveById(subreddit.id));
    //load subreddit posts
    dispatch(loadPosts({ term: subreddit.name, type: "subredditPosts" }));
    //set all quick access bar buttons to inactive
    dispatch(setAllToUnselected());
    //select Posts button to view posts
    dispatch(setToSelectedById("posts"));
    //set subreddits button state to disabled
    dispatch(setToDisabledById("subreddits"));
  };
};

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: [
    {
      name: "cats",
      id: "2qhta",
      img: "https://b.thumbs.redditmedia.com/tAT1hlAs4s7wGyszOHRrTVGNOnyZZWazTv6QEtlUHiQ.png",
      active: false,
    },
    {
      name: "rarepuppers",
      id: "3b749",
      img: "https://a.thumbs.redditmedia.com/vgsdeI9NEO30dWRjRJ8uI91pq3iqG-WhoND9XrBvY_4.png",
      active: false,
    },
    {
      name: "pics",
      id: "2qh0u",
      img: "https://b.thumbs.redditmedia.com/VZX_KQLnI1DPhlEZ07bIcLzwR1Win808RIt7zm49VIQ.png",
      active: false,
    },
    {
      name: "AskReddit",
      id: "2qh1i",
      img: "https://b.thumbs.redditmedia.com/EndDxMGB-FTZ2MGtjepQ06cQEkZw_YQAsOUudpb9nSQ.png",
      active: false,
    },
    {
      name: "funny",
      id: "2qh33",
      img: "https://a.thumbs.redditmedia.com/kIpBoUR8zJLMQlF8azhN-kSBsjVUidHjvZNLuHDONm8.png",
      active: false,
    },
    {
      name: "changemyview",
      id: "2w2s8",
      img: "https://b.thumbs.redditmedia.com/ZaY3-ORQJY1iJcT8ISAl0PODDuuH_Z3hrMf3JPC9_hk.png",
      active: false,
    },
    {
      name: "travel",
      id: "2qh41",
      img: media.userIcon,
      active: false,
    },
    {
      name: "TrueCrime",
      id: "2s5e8",
      img: "https://a.thumbs.redditmedia.com/xCXLiQQM_nH_REyYD9RwqazSFc_jwNaaP0oimlAwyg8.png",
      active: false,
    },
    {
      name: "Fitness",
      id: "2qhx4",
      img: "https://b.thumbs.redditmedia.com/Ted4KOMuRbaCYlDS55cTqjpVVZ2ENHKtYFbBFjI1i2o.png",
      active: false,
    },

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
      active: false,
    },
  ],
  reducers: {
    setAllInactive: (state) => {
      state.map((subreddit) => (subreddit.active = false));
    },
    setActiveById: (state, action) => {
      state.map((subreddit) =>
        subreddit.id === action.payload ? (subreddit.active = true) : ""
      );
    },
  },
});

export const { setAllInactive, setActiveById } = subredditsSlice.actions;
export const selectSubreddits = (state) => state.subreddits;
export default subredditsSlice.reducer;
