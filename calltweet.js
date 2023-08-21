// These are not my keys -- replace if I need to but they work for now

var consumerKey = "jJKwYVKkqnSkbr63NpK7Vzvkx";
var consumerSecret = "lTMfwMs7rDxz8vPcxBD7Gy5lDO8GXnlIzPw2d8xVhqa1L4xOTw";

var token = "364475473-kMBumzdzoxKZcduTwFGizG0iyMldRx1CQtcRXm2w";
var tokenSecret = "KBjBbqUZ0of2SQZDFEqSFof7kQPpENigIh7d3BMUQyCjN";

// Wrapper for allowing twitter api to be used easily with javascript
var cb = new Codebird();

function callTweet(newSearch, resultType, tCount) {
  cb.setConsumerKey(consumerKey, consumerSecret);
  cb.setToken(token, tokenSecret);

  // NewSearch resultType and tCount are passed from CallTweet's call, so they can be changed at will
  var params = {
    q: newSearch,
    result_type: "resultType",
    count: tCount,
  };

  //The following gives the commands that you can use
  //https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent
  //the following shows how to translate them into codebird (search for "Mapping API methods to Codebird function calls")
  //https://github.com/jublo/codebird-js

  cb.__call("search_tweets", params, function (reply) {
    var statuses = reply.statuses;
    for (var i = 0; i < statuses.length; i++) {
      var tweet = statuses[i];
      //Check to see that the tweet is not a retweet and is also not a reply. the final check is not elegant and removes emoji which i hate but removes kanji tweets
      //don't use if 1. tweet has been retweeted.  2. if the tweet is a reply. 3. if the tweet contains an @ symbol. 4. if the tweet contains non english characters. 5.MOST POWERFUL ONE: add anything in this string that i want to exclude entirely. right now it's excluding spanish characters
      if (
        !tweet.retweeted_status &&
        tweet.in_reply_to_status_id == null &&
        !match(tweet.text, "@") &&
        match(tweet.text, "[^x20-x7e]+") != null &&
        !checkIfString(tweet.text, "[áéíóúüñ¿¡]+")
      ) {
        // add an acceptable tweet to the pieTweet array
        tweet.text = removeURL(tweet.text);
        pieTweets.push(tweet.text);
      }
    }
    //after some searches have been added to the array, delete the first six temporary entries
    pieTweets.splice(0, 6);
  });
}

// Twitter API includes the twitter URL in the tweet object. This removes it.
function removeURL(str) {
  str = str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
  return str;
}

//I wrote this from scratch. It checks to see if something (myVar) contains certain characters (exceptions)
function checkIfString(myVar, exceptions) {
  //check to see if anything exists to begin with. if not, return false (the characters don't exist here)
  if (myVar == null) {
    return false;
  } else {
    //If the thing exists, check to see if it's a string. If it is, do next if statement
    if (typeof myVar === "string" || myVar instanceof String) {
      //if it's a string, make sure it isn't an array (not sure if i even have to do this) then see if it contains any of the exceptions
      if (match(myVar.toString(), exceptions)) {
        return true;
      }
    } else {
      return false;
    }
    return false;
  }
}
