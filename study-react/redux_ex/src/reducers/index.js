import {INCREMENT, DECREMENT, SET_DIFF} from '../actions';
import { combineReducers } from 'redux'; // combineReducers : 여러개의 reducer를 한개로 함칠 때 사용 되는 redux 내장 메소드

const counterInitialState = {
    value : 0,
    diff : 1
}

const counter = ( state = counterInitialState, action ) => {
    switch(action.type) {
        case INCREMENT :
            return Object.assign({}, state, {
                value: state.value + state.diff
            });
            break;
        case DECREMENT :
            return Object.assign({}, state, {
                value: state.value - state.diff
            });
            break;
        case SET_DIFF :
            return Object.assign({}, state, {
                diff: action.diff
            });
            break;
        default :
        console.log(state);
            return state;
    }
};

const extra = (state = {value:'this_is_extra_reducer'}, action) => {
    switch(action.type) {
        default : return state;
    }
}

const counterApp = combineReducers( {
    counter,
    extra
});

/*
const counterApp = (state = {}, action) => {
    return {
        counter : counter(state.counter, action),
        extra : extra(state.extra, action),
    }
}
*/

export default counterApp;
