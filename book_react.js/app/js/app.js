var React = require('react');
var ReactDom = require('react-dom');
var Application = require('./components/Application.react');

ReactDom.render(React.createElement(Application, null), document.getElementById('react-application'));
