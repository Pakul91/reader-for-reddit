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
    console.log(error.message);
    return error.message;
  }
};

//Load comments with provided permalink. Permalink is an endpoint for each posts comments
export const fetchComments = async function (permalink) {
  try {
    const response = await fetch(`${rootURL}${permalink}.json`);
    const data = await response.json();
    //data[1] contains some of the comments from the post
    return data[1];
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};
