var React = require('react');

var headerStyle = {
    fontSize : '16px',
    fontWeight : '300',
    display : 'block',
    margin : '20px 10px'
};

var Header = React.createClass({displayName: "Header",
    getDefaultProps : function() {
        return {
            text : 'Default Header'
        };
    },
    render : function() {
        return (
            React.createElement("h2", {style: headerStyle}, this.props.text)
        );
    }
});

module.exports = Header;
