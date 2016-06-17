var React = require('react');
var ReactDom = require('react-dom');
var Application = require('./components/Application.react');
var WebAPIUtils = require('./utils/WebAPIUtils');
WebAPIUtils.initializeStreamOfTweets();

ReactDom.render(React.createElement(Application, null), document.getElementById('react-application'));
