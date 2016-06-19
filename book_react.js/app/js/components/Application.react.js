var React = require('react');
var Stream = require('./Stream.react');
var Collection = require('./Collection.react');

var Application = React.createClass({displayName: "Application",

    render : function() {
        return (
            React.createElement("div", {className: "container-fluid"}, 
                React.createElement("div", {className: "row"}, 
                  React.createElement("div", {className: "col-md-4 text-center"}, 
                    React.createElement(Stream, null)
                  ), 
                  React.createElement("div", {className: "col-md-8"}, 
                    React.createElement(Collection, null)
                  )
                )
              )
        );
    }

});


module.exports = Application;
