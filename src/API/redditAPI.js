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
    const response = await fetch(`${rootURL}${endpoint}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
