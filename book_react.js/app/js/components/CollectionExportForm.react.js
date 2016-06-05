var React = require('react');

var formStyle={
    display:'inline-block'
};

var CollectionExportForm = React.createClass({displayName: "CollectionExportForm",
    render : function() {
        return (
            React.createElement("form", {action: "http://codepen.io/pen/define", method: "post", target: "_black", style: formStyle}, 
                React.createElement("input", {type: "hidden", name: "data", value: this.props.htmlMarkup}), 
                React.createElement("button", {type: "submit", className: "btn btn-default"}, "Export as HTML")
            )
        );
    }
});

module.exports = CollectionExportForm;
