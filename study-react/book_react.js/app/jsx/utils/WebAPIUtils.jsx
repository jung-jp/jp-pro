var SnapKiteStreamclient = require('snapkite-stream-client');
var TweetActionCreators = require('../actions/TweetActionCreators');

function initializeStreamOfTweets() {
    SnapKiteStreamclient.initializeStream(TweetActionCreators.receiveTweet);
}

module.exports = {
    initializeStreamOfTweets : initializeStreamOfTweets
}
