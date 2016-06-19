var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');
var CollectionUtils = require('../utils/CollectionUtils');
var CollectionStore = require('../stores/CollectionStore');

var Collection = React.createClass({displayName: "Collection",

    getInitialState : function() {
        return {
            collectionTweets : CollectionStore.getCollectionTweets()
        }
    },

    componentDidMount : function() {
        CollectionStore.addChangeListener(this.onCollectionChange);
    },

    componentWillUnmount : function() {
        CollectionStroe.removeChangeListener(this.onCollectionChange);
    },

    onCollectionChange : function() {
        this.setState({
            collectionTweets : CollectionStore.getCollectionTweets()
        });
    },

    createHtmlMarkupStringOfTweetList : function() {
        var htmlString = ReactDOMServer.renderToStaticMarkup(
            React.createElement(TweetList, {tweets: this.state.collectionTweets})
        );

        var htmlMarkup = {
            html : htmlString
        };
        return JSON.stringify(htmlMarkup);
    },

    render : function() {
        var collectionTweets = this.state.collectionTweets;
        var numberOfTweetsInCollection = CollectionUtils.getNumberOfTweetsInCollection(collectionTweets);
        var htmlMarkup;

        if ( numberOfTweetsInCollection > 0 ) {
            htmlMarkup = this.createHtmlMarkupStringOfTweetList();
            return (
                React.createElement("div", null, 
                    React.createElement(CollectionControls, {
                        numberOfTweetsInCollection: numberOfTweetsInCollection, 
                        htmlMarkup: htmlMarkup}), 
                    React.createElement(TweetList, {tweets: collectionTweets})
                )
            )
        }
        return  React.createElement(Header, {text: "컬렉션이 비어 있음(collection.js)"})
    }

})

module.exports = Collection;
