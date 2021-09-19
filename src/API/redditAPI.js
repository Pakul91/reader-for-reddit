// search for subreddits: search.json?q={TERM_WITHOUT_SPACE_HERE}&type=sr%2Cuser
// search for posts: search.json?q={TERM_WITHOUT_SPACE_HERE}&type=link&sort=top
// load specific user/subreddit: /r/${SUBREDDIT_NAME_HERE}.json
//

const rootURL = "https://www.reddit.com/";

const searchForSubreddit = async function (term = "popular") {
  try {
    const endpoint = `search.json?q=${term}&type=sr%2Cuser`;
    const response = await fetch(`${rootURL}${endpoint}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    return error.message;
  }
};

const searchForPosts = async function (term = "popular") {
  try {
    const endpoint = `search.json?q=${term}&type=link&sort=top`;
    const response = await fetch(`${rootURL}${endpoint}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    return error.message;
  }
};

const loadSubreddit = async function (subreddit) {
  if (!subreddit) return;

  try {
    const endpoint = `/r/${subreddit}.json`;
    const response = await fetch(`${rootURL}${endpoint}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    return error.message;
  }
};

export { searchForPosts, searchForSubreddit, loadSubreddit };
