import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import KanbanApi from '../KanbanApi';

let CardActionCreators = {

    fetchCards() {
        AppDispatcher.dispatchAsync(KanbanApi.fetchCards(), {
            request : constants.FETCH_CARDS,
            success : constants.FETCH_CARDS_SUCCESS,
            failure : constants.FETCH_CARDS_ERROR,
        });
    }
};

export default CardActionCreators;
