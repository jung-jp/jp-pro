var React = require('react');
// var SnapkiteStreamClient = require('snapkite-stream-client');
var StreamTweet = require('./StreamTweet.react');
var Header = require('./Header.react');
var TweetStore = require('../stores/TweetStore');

var Stream = React.createClass({
    // tweet 초기화
    getInitialState : function() {
        return {
            // tweet : null
            tweet : TweetStore.getTweet()
        }
    },

    // componentDidMount : function() {
    //     SnapkiteStreamClient.initializeStream(this.handleNewTweet);
    // },
    //
    // componentWillUnmount : function() {
    //     SnapkiteStreamClient.destroyStream();
    // },
    // //call back :: tweet를 받아와 셋 한다.
    // handleNewTweet:function(tweet) {
    //     this.setState({
    //         tweet : tweet
    //     });
    // },

    componentDidMount : function() {
        TweetStore.addChangeListener(this.onTweetChange);
    },
    componentWillUnmount : function() {
        TweetStore.removeChangeListener(this.onTweetChange);
    },

    onTweetChange : function () {
        this.setState({
            tweet : TweetStore.getTweet()
        })
    },

    render : function() {
        var tweet = this.state.tweet;
        if ( tweet ) {
            // return (
            //     <StreamTweet tweet={tweet} onAddTweetToCollection={this.props.onAddTweetToCollection} />
            // );

             return (
                <StreamTweet tweet={tweet} />
            );
        }

        return (
            <Header text="Waiting for public photos from Twitter..." />
        );
    }
});

module.exports = Stream;
