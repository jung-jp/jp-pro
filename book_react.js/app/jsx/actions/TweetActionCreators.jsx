var AppDispatcher = require('../dispatcher/AppDispatcher');

function receiveTweet(tweet) {
    console.log('call receiveTweet');
    //console.log('새로운 트윗을 받아서 액션객체를 디스패치에 넣는다.');
    //console.log(tweet);
    var action = {
        type : 'receive_tweet',
        tweet : tweet
    };
    AppDispatcher.dispatch(action);
}

module.exports = {
    receiveTweet : receiveTweet
}
