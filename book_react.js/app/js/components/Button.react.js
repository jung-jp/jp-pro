var React = require('react');

var buttonStyle = {
    margin: '10px 10px 10px 0'
};

var Button = React.createClass({displayName: "Button",
    render : function() {
        return React.createElement("button", {className: "btn-btn-default", style: buttonStyle, 
            onClick: this.props.handleClick}, this.props.label)
    }
});

module.exports = Button;