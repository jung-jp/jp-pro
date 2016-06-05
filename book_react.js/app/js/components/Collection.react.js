var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');

var Collection = React.createClass({displayName: "Collection",
    createHtmlMarkupStringOfTweetList : function() {
        var htmlString = ReactDOMServer.renderToStaticMarkup(
            React.createElement(TweetList, {tweets: this.props.tweets})
        );

        var htmlMarkup = {
            html : htmlString
        };
        return JSON.stringify(htmlMarkup);
    },
    getListOfTweetIds : function() {
        //console.log('Collection.js : getListOfTweetIds() => ', this.props.tweets);
        return Object.keys(this.props.tweets);
    },
    getNumberOfTweetsInCollection: function() {
        return this.getListOfTweetIds().length;
    },
    render : function() {
        var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();

        if ( numberOfTweetsInCollection > 0) {
            var tweets = this.props.tweets;
            var htmlMarkup = this.createHtmlMarkupStringOfTweetList();
            var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
            var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
            // console.log('tweets : ', tweets);
            // console.log('htmlMarkup : ', htmlMarkup);
            // console.log('removeAllTweetsFromCollection : ', removeAllTweetsFromCollection);
            // console.log('handleRemoveTweetFromCollection : ', handleRemoveTweetFromCollection);
            return (
                React.createElement("div", null, 
                    React.createElement(CollectionControls, {
                        numberOfTweetsInCollection: numberOfTweetsInCollection, 
                        htmlMarkup: htmlMarkup, 
                        onRemoveAllTweetsFromCollection: removeAllTweetsFromCollection}), 
                    React.createElement(TweetList, {
                        tweets: tweets, onRemoveTweetFromCollection: handleRemoveTweetFromCollection})
                )
            );
        }

        return  React.createElement(Header, {text: "컬렉션이 비어 있음(collection.js)"})
    }
})

module.exports = Collection;
