var React = require('react');
var SnapkiteStreamClient = require('snapkite-stream-client');
var StreamTweet = require('./StreamTweet.react');
var Header = require('./Header.react');

var Stream = React.createClass({displayName: "Stream",
    // tweet 초기화
    getInitialState : function() {
        return {
            tweet : null
        }
    },

    componentDidMount : function() {
        SnapkiteStreamClient.initializeStream(this.handleNewTweet);
    },

    componentWillUnmount : function() {
        SnapkiteStreamClient.destroyStream();
    },
    //call back :: tweet를 받아와 셋 한다.
    handleNewTweet:function(tweet) {
        this.setState({
            tweet : tweet
        });
    },

    render : function() {
        var tweet = this.state.tweet;
        if ( tweet ) {
            return (
                React.createElement(StreamTweet, {tweet: tweet, onAddTweetToCollection: this.props.onAddTweetToCollection})
            );
        }

        return (
            React.createElement(Header, {text: "Waiting for public photos from Twitter..."})
        );
    }
});

module.exports = Stream;
