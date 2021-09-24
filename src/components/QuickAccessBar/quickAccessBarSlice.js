import { createSlice } from "@reduxjs/toolkit";
import { loadPosts } from "../searchResults/searchResultsSlice";

/**
 *
 * @param {[{}]} buttons | an array of buttons from selector
 * @param {string} buttonId | button id passed from event handler
 * @returns
 */
export const quickAccessBtnClick = ({ buttons, buttonId }) => {
  return (dispatch) => {
    const id = buttonId;

    // if already selected or  disabled return
    if (buttons[id].selected || buttons[id].disabled) return;
    //Unselect all
    dispatch(setAllToUnselected());
    //Select clicked button
    dispatch(setToSelectedById(id));
    //Set posts to selected
    dispatch(setToSelectedById("posts"));
    //Set subreddits to disabled
    dispatch(setToDisabledById("subreddits"));
    //load search results for given category
    dispatch(loadPosts({ term: id, type: "category" }));
  };
};

export const quickAccessBarSlice = createSlice({
  name: "quickAccessBar",
  initialState: {
    buttons: {
      posts: {
        type: "content",
        id: "posts",
        selected: true,
        disabled: false,
        title: "Display posts",
      },
      subreddits: {
        type: "content",
        id: "subreddits",
        selected: false,
        disabled: true,
        title: "Display subreddits",
      },
      hot: {
        type: "quickAccess",
        id: "hot",
        selected: true,
        disabled: false,
        title: "Hotest post today",
      },
      top: {
        type: "quickAccess",
        id: "top",
        selected: false,
        disabled: false,
        title: "Most popular posts",
      },
      new: {
        type: "quickAccess",
        id: "new",
        selected: false,
        disabled: false,
        title: "New post from today",
      },
      rising: {
        type: "quickAccess",
        id: "rising",
        selected: false,
        disabled: false,
        title: "Rising in popularity",
      },
    },
  },
  reducers: {
    // Set all buttons to Unselected
    setAllToUnselected: (state) => {
      Object.values(state.buttons).map((button) => (button.selected = false));
    },
    /**
     * Set selected button state to selected = true
     * @param {{}} state |
     * @param {string} action | id of the button provided by event listener when clicked on it
     */
    setToSelectedById: (state, action) => {
      state.buttons[action.payload].selected = true;
    },

    /**
     *Set selected button state to disabled = true
     * @param {{}} state |
     * @param {string} action | id of the button provided by event listener when clicked on it
     */
    setToDisabledById: (state, action) => {
      state.buttons[action.payload].disabled = true;
    },

    /**
     *Set selected button state to disabled = false
     * @param {{}} state |
     * @param {string} action | id of the button provided by event listener when clicked on it
     */
    unsetDisabledById: (state, action) => {
      state.buttons[action.payload].disabled = false;
    },

    // Toggle between Posts and Subbredits selection
    toggleContent: (state) => {
      state.buttons.posts.selected = !state.buttons.posts.selected;
      state.buttons.subreddits.selected = !state.buttons.subreddits.selected;
    },
  },
});

// Selectors
export const selectButtons = (state) => state.quickAccessBar.buttons;
export const selectPostsButtonStatus = (state) =>
  state.quickAccessBar.buttons.posts.selected;
export const selectSubredditsButtonStatus = (state) =>
  state.quickAccessBar.buttons.subreddits.selected;
// Action creators
export const {
  setAllToUnselected,
  setToSelectedById,
  setToDisabledById,
  unsetDisabledById,
  toggleContent,
  applyStyleByStatus,
} = quickAccessBarSlice.actions;
// Reducer export
export default quickAccessBarSlice.reducer;
