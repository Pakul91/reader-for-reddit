/**
 * Set timeout to fetch function to prevent hanging forever.
 * @param {string} url string with url API
 * @param {number} time time in witch timeout should execute
 * @returns fetch result
 */
export const fetchWithTimeout = async function (url, time = 8000) {
  //used to abort fetch request
  const controller = new AbortController();
  //abort request and throw error when time passed
  const timer = setTimeout(() => {
    controller.abort();
  }, time);
  //fetch
  const response = await fetch(url, { signal: controller.signal });
  //clear timeout if fetch response is faster
  clearTimeout(timer);

  return response;
};

/**
 * Format provided posts data
 * @param {{}} data provided from fetch request
 * @returns Object with formated data in format: 'id_of_the_post':{ reguired data}
 */
export const formatPosts = ({ data }) => {
  const formatedPosts = {};

  data.children.map(
    ({ data }) =>
      (formatedPosts[data.id] = {
        id: data.id,
        author: data.author,
        created: data.created,
        subreddit: data.subreddit,
        subredditId: data.subreddit_id,
        title: data.title,
        thumbnail: data.thumbnail,
        ups: data.ups,
        imgURL: data.url,
        permalink: data.permalink,
        text: data.selftext,
        // conditinally adding property:
        ...(data.media &&
          data.media.reddit_video && {
            videoURL: data.media.reddit_video.fallback_url,
          }),
        ...(data.media &&
          data.media.oembed && {
            embededVid: data.media.oembed.html,
          }),
      })
  );

  return formatedPosts;
};

/**
 * Format provided subreddits data
 * @param {{}} data provided from fetch request
 * @returns Object with formated data in format: 'id_of_the_subreddit':{ reguired data}
 */
export const formatSubreddits = ({ data }) => {
  const formatedSubreddits = {};

  data.children.map(
    ({ data }) =>
      (formatedSubreddits[data.id] = {
        id: data.id,
        name: data.display_name,
        img: data.icon_img,
        description: data.public_description,
        subscribers: data.subscribers,
      })
  );

  return formatedSubreddits;
};

//format if term provided is more than 1 word
export const formatTerm = (term) => {
  //if no term provided return
  if (!term) return;
  //convert string to array of seperate words
  const wordsArray = term.split(" ");
  //if there is single word return non-formated term
  if (wordsArray.length === 1) return term;
  // else add %20 before each word and join it into 1 string
  const formatedWords = wordsArray.map((word) => `%20${word}`).join("");
  return formatedWords;
};

//Format number for upvotes and subscribers
export const formatNumber = function (num) {
  //converting number for milions
  const milions = Math.floor(num / 1000000);
  const decimalForMilion = Math.floor((num % 1000000) / 100000);

  //converting number for thousands
  const thousands = Math.floor(num / 1000);
  const decimalForThousands = Math.floor((num % 1000) / 100);

  //return values

  const thousandsWithDecimals = `${thousands}${
    decimalForThousands ? `.${decimalForThousands}` : ""
  }k`;
  const thousandsWithoutDecimals = `${thousands}k`;
  const milionsWithDecimals = `${milions}.${decimalForMilion}m`;

  if (num < 1000) return num;
  if (999 < num && num < 100000) return thousandsWithDecimals;
  if (99999 < num && num < 1000000) return thousandsWithoutDecimals;
  if (999999 < num) return milionsWithDecimals;
};

//Calculate and format time passed since postig
export const formatTime = function ({ created }) {
  const minsPast = Math.floor((Date.now() / 1000 - created) / 60);

  // divade by number of minutes in a year
  const years = Math.floor(minsPast / 525600);
  // divade by number of minutes in a month
  const months = Math.floor(minsPast / 43800);
  // divade by number of minutes in a week
  const weeks = Math.floor(minsPast / 10080);
  // divade by number of minutes in a day
  const days = Math.round(minsPast / 1440);
  // divade by number of minutes in an hour
  const hours = Math.round(minsPast / 60);

  if (years) {
    return years > 1 ? `${years} years` : `${years} year`;
  }
  if (months) {
    return months > 1 ? `${months} months` : `${months} month`;
  }
  if (weeks) {
    return weeks > 1 ? `${weeks} weeks` : `${weeks} week`;
  }
  if (days) {
    return days > 1 ? `${days} days` : `${days} day`;
  }
  if (hours) {
    return hours > 1 ? `${hours} hours` : `${hours} hour`;
  }
  return minsPast > 1 ? `${minsPast} minutes` : `${minsPast} minute`;
};

// Check if provided url has an image extension
export function isImg(url) {
  if (!url) return false;
  const imgUrl = url;
  const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp|gif)$/i;
  return regex.test(imgUrl);
}
// Check if provided url has an video extension
export function isVid(url) {
  if (!url) return false;

  //If video has gifv format replace it to mp4
  let vidUrl = url.replaceAll("gifv", "mp4");

  const regex = /\.(mp4|WebM|OGG)$/i;

  //if video has valid format return link, in not return false
  return regex.test(vidUrl) ? vidUrl : regex.test(vidUrl);
}

//format embeded video link
export function formatEmbeded(link) {
  if (!link) return;
  const formatedLink = link.replaceAll("&lt;", "<").replaceAll("&gt;", ">");

  return formatedLink;
}

// Apply style selector suffix depending on status
export function applyStyleByStatus(buttons, id) {
  if (buttons[id].selected) return "-selected";
  if (buttons[id].disabled) return "-disabled";
  // if non apply return empty string
  return "";
}
