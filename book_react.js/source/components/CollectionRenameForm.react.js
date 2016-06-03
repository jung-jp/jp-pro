var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Button = require('./Button.react');

var inputStyle = {
    marginRight : '5px'
}

var CollectionRenameForm = React.createClass({
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
        event.preventDefault();
        var collectionName = this.state.inputValue;
        this.props.onChangeCollectionName(collectionName);
    },

    handleFormCancel : function(event) {
        event.preventDefault();
        var collectionname = this.props.name;
        this.setInputValue(collectionName);
        this.props.onCancelCollectionNameChange();
    },

    componentDidMount : function() {
        this.refs.collectionName.forcus();
    },

    render: function() {
        return (
            <form classname="form-inline" onSubmit="{this.handelSubmit}">
                <Header Text="collectin name:" />
                <div className="form-group">
                    <input classNamme="form-control"
                        style={inputStyle}
                        onChange={this.handleInputValueChange}
                        value={this.state.inputValue}
                        ref="collectionName" />
                </div>
                <Button label="Change" handleclick="{this.handleFormSubmit}" />
                <Button label="Cancel" handleclick="{this.handleFormCancel}" />
            </form>
        );
    }
});

module.exports = CollectionRenameForm;
