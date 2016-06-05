var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Tweet = require('./Tweet.react');

var StreamTweet = React.createClass({

    getInitialState : function() {
        //console.log('1. getInitialState()');
        return {
            numberOfCharactersIsIncreasing : null,
            headerText : null
        };
    },

    componentWillMount : function() {
        //console.log('2. componentWillMount()');
        this.setState({
            numberOfCharactersIsIncreasing : true,
            headerText : '트위터의 최근 공개 사진'
        });

        window.snapterest = {
            numberOfReceivedTweets : 1,
            numberOfDisplayedTweets: 1
        }
    },

    componentDidMound : function() {
        //console.log('3. componentDidMount()');
        var componentDOMRepresentation = ReactDOM.findDOMNode(this);
        window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML;
        window.snapterest.tweetHTML  = componentDOMRepresentation.children[1].outerHTML;
    },

    /**
     * 컴포넌트 업데이트 생명주기
     */

    // 1. 이 메소드가 컴포넌트 생명주기의 업데이트 단계에서 가장 먼저 실행되며, 부모 컴포넌트로부터 새로운 프로퍼티를 받을대 호출 된다.
    componentWillReceiveProps : function (nextProps) {
        //console.log('4. componentWillReceiveProps()');
        var currentTweetLength = this.props.tweet.text.length;
        var nextTweetLength = nextProps.tweet.text.length;
        var isNumberOfCharactersincreasing = (nextTweetLength > currentTweetLength);
        var headerText;

        this.setState({
            numberOfCharactersIsIncreasing: isNumberOfCharactersincreasing
        })

        if (isNumberOfCharactersincreasing) {
            headerText = '글자수가 늘어나고 있음('+currentTweetLength + ' >> ' + nextTweetLength+')';
        } else {
            headerText = '최근 공개 사진';
        }

        this.setState({
            headerText : headerText
        });

        window.snapterest.numberOfReceivedTweets++;
    },

    // 2. 컴포넌ㅌ의 다음 상태로 컨포넌트의 재렌더링 여부를 결정할 수 있다.
    shouldComponentUpdate : function(nextProps, nextState) {
        //console.log('5. shouldComponentUpdate()');
        return (nextProps.tweet.text.length > 1);

    },
    // 컴포넌트가 돔을 업데이트하기 바로 직전에 호출된다.
    // 메소드가 호출되고 나서, React는 Dom 업데이트를 수행하기 위해 render() 메소드를 실행한다. 이어서 componentDidUpdate() 메소드가 호출된다.
    componentWillUpdate : function(nextProps, nextState) {
        //console.log('6. componentWillUpdate()');
    },

    // React에서 DOM을 업데이트하자마자 호출된다. 업데이트된 DOM과 상호작용하거나 렌더링 이후에 명령들을 수행할 수 있다.
    componentDidUpdate : function(prevProps, prevState) {
        //console.log('7. componentDidUpdate()');
        window.snapterest.numberOfReceivedTweets++;
    },

    componentWillUnmount : function() {
        //console.log('8. componentWillUnmount()');
        delete window.snapterest;
    },

    render : function() {
        return (
            <section>
                <Header text={this.state.headerText} />
                <Tweet tweet={this.props.tweet} onImageClick={this.props.onAddTweetToCollection} />
            </section>
        );
    }

})

module.exports = StreamTweet;
