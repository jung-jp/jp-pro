
var React = require('react');

var tweetStyle = {
    position: 'relative',
    display:'inline-block',
    widht:'300px',
    height:'400px',
    margin:'10px'
}

var imageStyle = {
    maxHeight:'400px',
    boxShadow:'0px 1px 1px 0px #aaa',
    border:'1px solid #fff'
}

var Tweet = React.createClass({
    // 유효성 체크는 성능에 영향이 있어 개발용도로 사용한다.
    propTypes : {
        tweet : function(properties, propertyName, componentName) {
            var tweet = properties[propertyName];

            if (!tweet) {
                return new Error('객체 없음 : !tweet == false, ' + properties + ', ' + propertyName + ', ' + componentName);
            }

            if (!tweet.media) {
                return new Error('미디어 없음 : !tweet.media == false');
            }
        },

        onImageClick: React.PropTypes.func
    },

    // Application.onAddTweetToCollection()
    handleImageClick : function() {

        var tweet = this.props.tweet;
        var onImageClick = this.props.onImageClick;
        if (onImageClick) {
            console.log('onImageClick(tweet);');
            onImageClick(tweet);
        }
    },

    render : function() {
        var tweet = this.props.tweet;
        var tweetMediaUrl = tweet.media[0].url;
        return (
            <div style={tweetStyle}>
                <img src={tweetMediaUrl} onClick={this.handleImageClick} style={imageStyle} />
            </div>
        )
    }
});

module.exports = Tweet;
