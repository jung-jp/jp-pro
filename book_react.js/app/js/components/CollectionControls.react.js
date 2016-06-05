var React = require('react');
var Header = require('./Header.react');
var Button = require('./Button.react');
var CollectionRenameForm = require('./CollectionRenameForm.react');
var CollectionExportForm = require('./CollectionExportForm.react');

var CollectionControls = React.createClass({displayName: "CollectionControls",
    getInitialState : function() {
        return {
            name : 'new',
            isEditingName : false
        };
    },

    getHeaderText : function() {
        var numberOfTweetsInCollection = this.props.numberOfTweetsInCollection;
        var text = numberOfTweetsInCollection;

        if (numberOfTweetsInCollection === 1) {
            text = text + ' tweet in your';
        } else {
            text = text + ' tweets in your';
        }

        return (
            React.createElement("span", null, 
                text, " ", React.createElement("strong", null, this.state.name), " collection"
            )
        );
    },

    toggleEditCollectionName : function() {
        this.setState({
            isEditingName : !this.state.isEditingName
        });
    },

    setCollectionName : function(name) {
        this.setState({
            name : name,
            isEditingName : false
        });
    },

    render : function() {
        if (this.state.isEditingName) {
            return (
                React.createElement(CollectionRenameForm, {name: this.state.name, 
                    onChangeCollectionName: this.setCollectionName, 
                    onCancelCollectionNameChange: this.toggleEditCollectionName})
            );
        }

        return (
            React.createElement("div", null, 
                React.createElement(Header, {text: this.getHeaderText()}), 
                React.createElement(Button, {label: "이름 변경", handleClick: this.toggleEditCollectionName}), 
                React.createElement(Button, {label: "컬렉션 모두 삭제", handleClick: this.props.onRemoveAllTweetsFromCollection}), 
                React.createElement(CollectionExportForm, {htmlMarkup: this.props.htmlMarkup})
            )
        );
    }
});

module.exports = CollectionControls;
