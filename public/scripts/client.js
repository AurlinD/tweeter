//import { createPublicKey } from "crypto";

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// stackoverflow code that calculates JS time;
// JS time starts at Jan 1st, 1975
function timeSince(date) {
  let seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
let aDay = 24 * 60 * 60 * 1000;

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet of tweets) {
    console.log(createTweetElement(tweet));
    let $tweet = createTweetElement(tweet);
    $("#tweets-container").prepend($tweet);
  }
};

const createTweetElement = function(tweet) {
  // HEADER
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

  // CONTENT
  let $main = $("<main>").text(tweet.content.text);
  $tweet.append($header);
  $tweet.append($main);

  // FOOTER

  //time
  let date = new Date(tweet.created_at);
  let timeElapsed = timeSince(date);
  let $footer = $("<footer>").text(`${timeElapsed} ago`);

  let $icons = $("<span>");
  let $flag = $("<i>").addClass("far fa-flag");
  let $retweet = $("<i>").addClass("fas fa-retweet");
  let $like = $("<i>").addClass("far fa-heart");
  $icons.append($flag);
  $icons.append($retweet);
  $icons.append($like);
  $footer.append($icons);
  $tweet.append($footer);

  return $tweet;
};

const loadTweets = function() {
  $.ajax({
    method: "GET",
    url: "http://localhost:8080/tweets"
  }).done(renderTweets);
};

$(document).ready(function() {
  $(function() {
    const $form = $("form");
    $form.on("submit", function(event) {
      event.preventDefault();
      if ($("#tweet-text").val() === "") {
        $("#errorLength").slideUp(0);
        $("#errorEmpty").slideDown();
        return;
      } else if ($("#tweet-text").val().length > 140) {
        $("#errorEmpty").slideUp(0);
        $("#errorLength").slideDown();
        return;
      } else {
        $.ajax({
          method: "POST",
          url: "http://localhost:8080/tweets/",
          data: $(this).serialize()
        }) // done doesn't have return value while .then does. Reset message box to empty state
          .done(function() {
            $("#tweet-text").val("");
            $("#tweet-text").text("");
            $(".counter").text(140);
            loadTweets();
          });
      }
    });
  });
});
