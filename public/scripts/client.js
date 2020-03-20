/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    console.log(createTweetElement(tweet));
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").append($tweet);
  }
};

const createTweetElement = function(tweet) {
  let $tweet = $("<article>").addClass("tweet");
  let $header = $("<header>");
  let $spanName = $("<span>")
    .text(tweet.user.name)
    .addClass("name");
  let $spanHandler = $("<span>")
    .text(tweet.user.handle)
    .addClass("handler");
  let $profilePic = $("<img>").attr("src", tweet.user.avatars);
  let $nameAvatar = $("<div>").addClass("nameAvatar");
  $nameAvatar.append($profilePic);
  $nameAvatar.append($spanName);
  $header.append($nameAvatar);
  $header.append($spanHandler);

  let $main = $("<main>").text(tweet.content.text);
  $tweet.append($header);
  $tweet.append($main);

  // ...
  return $tweet;
};

$(document).ready(function() {
  renderTweets(data);
});
