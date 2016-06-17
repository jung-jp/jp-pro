var AppDispatcher = require('../dispatcher/AppDispatcher');

function receiveTweet(tweet) {

    console.log('액션이 실행 => 디스패치 => 스토어로 tweet을 받아옴.');

    var action = {
        type : 'receive_tweet',
        tweet : tweet
    };
    AppDispatcher.dispatch(action);
}

module.exports = {
    receiveTweet : reveiveTweet
}
