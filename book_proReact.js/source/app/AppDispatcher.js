import {Dispatcher} from 'flux';
import 'babel-polyfill';

class AppDispatcher extends Dispatcher {
    AppDispatcher.dispatchAsync(KanbanApi.fetchCards(), {
        request : constants.FETCH_CARDS,
        success : constants.FETCH_CARDS_SUCCESS,
        failure : constants.FETCH_CARDS_ERROR,
    });
    dispatchAsync(promise, types, payload) {
        const { request, success, failure } = types;
        this.dispatch( { type : request, payload : Object.assign({}, payload)} );
        promise.then(
            res => this.dispatch({
                type : success,
                payload : Object.assign({}, payload, {res})
            }),
            error => this.dispatch({
                type : failure,
                payload : Object.assign({}, payload, {error})
            })
        );
    }
}

export default new AppDispatcher();
