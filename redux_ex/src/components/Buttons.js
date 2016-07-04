import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../actions';

class Buttons extends React.Component {
    render() {
        return (
            <div>
                <button type="button" onClick={this.props.onIncrement}>
                    +
                </button>
                <button type="button" onClick={this.props.onDecrement}>
                    -
                </button>
            </div>
        )
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onIncrement : _ => dispatch(increment()),
        onDecrement : _ => dispatch(decrement())
    }
}

Buttons = connect(undefined, mapDispatchToProps)(Buttons);

export default Buttons;
