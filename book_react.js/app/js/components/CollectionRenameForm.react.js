var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Button = require('./Button.react');

var inputStyle = {
    marginRight : '5px'
}

var CollectionRenameForm = React.createClass({displayName: "CollectionRenameForm",
    getInitialState: function() {
        return {
            inputValue : this.props.name
        }
    },

    setInputValue : function(inputValue) {
        this.setState({
            inputValue : inputValue
        });
    },

    handleInputValueChange : function( event ) {
        var inputValue = event.target.value;
        this.setInputValue(inputValue);
    },

    handleFormSubmit : function(event) {
        console.log('handleFormSubmit');
        event.preventDefault();
        var collectionName = this.state.inputValue;
        this.props.onChangeCollectionName(collectionName);
    },

    handleFormCancel : function(event) {
        console.log('handleFormCancel');
        event.preventDefault();
        var collectionname = this.props.name;
        this.setInputValue(collectionName);
        this.props.onCancelCollectionNameChange();

    },

    componentDidMount : function() {
        this.refs.collectionName.focus();
    },

    render: function() {
        // ref : render() 메소드에 의해 반환되는 컴포넌트에 적용될 수 있는 특별한 용도의 React 프로퍼티다.
        //       외부의 컴포넌트에서 refs.collectionName 형식으로 참조할 수 있다.
        return (
            React.createElement("form", {className: "form-inline", onSubmit: this.handleFormSubmit}, 
                React.createElement(Header, {Text: "컬렉션 이름 : "}), 
                React.createElement("div", {className: "form-group"}, 
                    React.createElement("input", {classNamme: "form-control", 
                        style: inputStyle, 
                        onChange: this.handleInputValueChange, 
                        value: this.state.inputValue, 
                        ref: "collectionName"})
                ), 
                React.createElement(Button, {label: "이름변경", handleclick: this.handleFormSubmit}), 
                React.createElement(Button, {label: "취소", handleclick: this.handleFormCancel})
            )
        );
    }
});

module.exports = CollectionRenameForm;
