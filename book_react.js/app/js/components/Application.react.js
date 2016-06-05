var React = require('react');
var Stream = require('./Stream.react');
var Collection = require('./Collection.react');

var Application = React.createClass({displayName: "Application",
    getInitialState :function() {
        return {
            collectionTweets : {}
        }
    },

    addTweetToCollection : function(tweet) {
        var collectionTweets = this.state.collectionTweets;
        collectionTweets[tweet.id] = tweet;
        this.setState({
            collectionTweets : collectionTweets
        });
    },

    removeTweetFromCollection: function (tweet) {
        var collectionTweets = this.state.collectionTweets;

        delete collectionTweets[tweet.id];

        this.setState({
            collectionTweets: collectionTweets
        });
    },

    removeAllTweetsFromCollection : function() {
        this.setState({
            collectionTweets : {}
        });
    },

    render : function() {
        return (
            React.createElement("div", {className: "container-fluid"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-md-4 text-center"}, 
                    React.createElement(Stream, {onAddTweetToCollection: this.addTweetToCollection})
                  ), 
                  React.createElement("div", {className: "col-md-8"}, 
                    React.createElement(Collection, {
                      tweets: this.state.collectionTweets, 
                      onRemoveTweetFromCollection: this.removeTweetFromCollection, 
                      onRemoveAllTweetsFromCollection: this.removeAllTweetsFromCollection})
                  )
                )
              )
        );
    }
});


module.exports = Application;
