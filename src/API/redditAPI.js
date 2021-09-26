import { fetchWithTimeout } from "../Helpers/HELPERS";

// search for subreddits: search.json?q={TERM_WITHOUT_SPACE_HERE}&type=sr%2Cuser
// const endpoint = `search.json?q=${term}&type=sr%2Cuser`;

// search for posts: search.json?q={TERM_WITHOUT_SPACE_HERE}&type=link
// const endpoint = `search.json?q=${term}&type=link`;

// load specific user/subreddit: /r/${SUBREDDIT_NAME_HERE}.json
// const endpoint = `/r/${subreddit}.json`;

// load hot/new/top(for today)/rising: {CATEGORY_IN_HERE}.json
// const endpoint = `/{}`;

const rootURL = "https://www.reddit.com/";

export const fetchData = async function (endpoint) {
  try {
    const url = `${rootURL}${endpoint}`;
    const response = await fetchWithTimeout(url, 10000);
    const data = await response.json();
    return data;
  } catch (error) {
    // Replace message for best user experience
    const msg =
      error.message === "The user aborted a request."
        ? "Fetch request takes too long!"
        : error.message;
    throw msg;
  }
};

//Load comments with provided permalink. Permalink is an endpoint for each posts comments
export const fetchComments = async function (permalink) {
  try {
    const url = `${rootURL}${permalink}.json`;
    const response = await fetchWithTimeout(url, 10000);
    const data = await response.json();
    //data[1] contains  comments from the post
    return data[1];
  } catch (error) {
    // Replace message for best user experience
    const msg =
      error.message === "The user aborted a request."
        ? "Fetch request takes too long!"
        : error.message;
    throw msg;
  }
};
