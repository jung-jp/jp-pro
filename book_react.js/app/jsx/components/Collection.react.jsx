var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');
var CollectionUtils = require('../utils/CollectionUtils');
var CollectionStore = require('../stores/CollectionStore');

var Collection = React.createClass({

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

    onCollectionCahnge : function() {
        this.setState({
            collectionTweets : CollectionStore.getCollectionTweets()
        });
    },

    createHtmlMarkupStringOfTweetList : function() {
        var htmlString = ReactDOMServer.renderToStaticMarkup(
            <TweetList tweets={this.props.tweets} />
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
                <div>
                    <CollectionControls
                        numberOfTweetsInCollection = {numberOfTweetsInCollection}
                        htmlMarkup = {htmlMarkup} />
                    <TweetList tweets = {collectionTweets} />
                </div>
            )
        }
        return  <Header text="컬렉션이 비어 있음(collection.js)" />
    }

    // getListOfTweetIds : function() {
    //     //console.log('Collection.js : getListOfTweetIds() => ', this.props.tweets);
    //     return Object.keys(this.props.tweets);
    // },
    // getNumberOfTweetsInCollection: function() {
    //     return this.getListOfTweetIds().length;
    // },
    // render : function() {
    //     var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();
    //
    //     if ( numberOfTweetsInCollection > 0) {
    //         var tweets = this.props.tweets;
    //         var htmlMarkup = this.createHtmlMarkupStringOfTweetList();
    //         var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
    //         var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection;
    //         // console.log('tweets : ', tweets);
    //         // console.log('htmlMarkup : ', htmlMarkup);
    //         // console.log('removeAllTweetsFromCollection : ', removeAllTweetsFromCollection);
    //         // console.log('handleRemoveTweetFromCollection : ', handleRemoveTweetFromCollection);
    //         return (
    //             <div>
    //                 <CollectionControls
    //                     numberOfTweetsInCollection={numberOfTweetsInCollection}
    //                     htmlMarkup={htmlMarkup}
    //                     onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection} />
    //                 <TweetList
    //                     tweets={tweets} onRemoveTweetFromCollection={handleRemoveTweetFromCollection} />
    //             </div>
    //         );
    //     }
    //
    //     return  <Header text="컬렉션이 비어 있음(collection.js)" />
    // }
})

module.exports = Collection;
