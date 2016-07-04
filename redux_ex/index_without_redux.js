import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';

/**
 * Action
 */
const INCREMENT = 'INCREMENT';

function increase(diff) {
    return {
        type : INCREMENT,
        addBy : diff
    };
}

/**
 * Reducer
 */
const initalState = {
    value : 0
};

const counterReducer = (state = initalState, action) => {
    switch(action.type) {
        case INCREMENT :
            return Object.assign({}, state, {
                value : state.value + action.addBy
            });
            break;
        default :
            return state;
    }
};

/**
 * Store
 */
const store = createStore(counterReducer);


class App extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    render() {
        let centerStyle = {
            position : 'fixed',
            top : '50%',
            left : '50%',
            transform: 'translate(-50%, -50%)',
            WebkitUserSelect : 'none',
            MozUserSelect: 'none',
            MsUserSelect: 'none',
            UserSelect: 'none',
            cursor: 'pointer'
        };
        return (
            <div
                onClick={this.onClick}
                style={centerStyle}
            >
                <h1>{this.props.store.getState().value}</h1>
            </div>
        )
    }

    onClick() {
        this.props.store.dispatch(increase(1));
    }
}

/**
  이 컴포넌트는 랜더링 될 때 store를 props로 전달 받는다.

  store.getState() : 현재 스토어에있는  데이터를 반환한다.
  store.dispatch(ACTION) : 상태값을 수정 할 때 사용되는 메소드, 인수로는  action이 전달 된다.
 */

/**
 * Rendering
 */
const render = () => {
    const appElement = document.getElementById('app');
    ReactDom.render(<App store={store} />, appElement);
}

store.subscribe(render);
render();
