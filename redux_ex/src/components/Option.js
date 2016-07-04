import React from 'react';
import { connect } from 'react-redux';
import { setDiff } from '../actions';

class Option extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            diff : 1
        }

        this.onChangeDiff = this.onChangeDiff.bind(this);
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.diff} onChange={this.onChangeDiff} />
            </div>
        )
    }

    onChangeDiff(e) {

        if ( isNaN(e.target.value) ) {
            return
        }

        if ( e.target.value == '' ) {
            this.setState( {diff:'0'} );
        } else {
            this.setState( {diff:e.target.value} );
        }

        this.props.onUpdateDiff(parseInt(e.target.value, 10));
    }
}

let mapDispatchToProps = dispatch => {
    return {
        onUpdateDiff : value => dispatch( setDiff(value) )
    }
}

Option = connect(undefined, mapDispatchToProps)(Option);

export default Option;
