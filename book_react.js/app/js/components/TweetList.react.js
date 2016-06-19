var React = require('react');
var Tweet = require('./Tweet.react.js');
var CollectionActionCreators = require('../actions/CollectionActionCreators');

var listStyle = {
    padding : 0
};

var listItemStyle = {
    display:'inline-block',
    listStyle : 'none'
};

var TweetList = React.createClass({displayName: "TweetList",
    getListOfTweetIds : function() {
        return Object.keys(this.props.tweets);
    },

    removeTweetFromCollection : function(tweet) {
        CollectionActionCreators.removeTweetFromCollection(tweet.id);
    },

    getTweetElement: function(tweetId) {
        var tweet = this.props.tweets[tweetId];
        var handleRemoveTweetFromcollection = this.removeTweetFromCollection;
        // var handleRemoveTweetFromcollection = this.props.onRemoveTweetFromCllection;
        var tweetElement;

        if ( handleRemoveTweetFromcollection ) {
            tweetElement = (
                React.createElement(Tweet, {tweet: tweet, onImageClick: handleRemoveTweetFromcollection})
            );
        } else {
            tweetElement = (
                React.createElement(Tweet, {tweet: tweet})
            );
        }

        return React.createElement("li", {style: listItemStyle, key: tweet.id}, tweetElement);
    },

    render : function() {
        var tweetElements = this.getListOfTweetIds().reverse().map(this.getTweetElement);
        return (
            React.createElement("ul", {style: listStyle}, tweetElements)
        );
    }

});

module.exports = TweetList;
