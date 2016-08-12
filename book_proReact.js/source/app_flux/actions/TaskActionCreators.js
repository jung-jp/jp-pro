import AppDispatcher from '../AppDispatcher';
import constants from '../constants';
import KanbanApi from '../KanbanApi';

let TaskActionCreators = {
    addTask(cardId, task) {
        let promise = KanbanAPI.addTask(cardId, task);
        let type = {request : constants.CREATE_TASK, success : constants.CREATE_TASK_SUCCESS, failure : constants.CREATE_TASK_ERROR};
        let payload = {cardId, task}
        AppDispatcher.dispatchAsync(promise, type, payload);
    },

    deleteTask(cardId, task, taskIndex) {
        let promise = KanbanAPI.deleteTask(cardId, task);
        let type = {request : constants.DELETE_TASK, success : constants.DELETE_TASK_SUCCESS, failure : constants.DELETE_TASK_ERROR};
        let payload = {cardId, task, taskIndex}
        AppDispatcher.dispatchAsync(promise, type, payload);
    },

    toogleTask(cardId, task, taskIndex) {
        let promise = KanbanAPI.toogleTask(cardId, task);
        let type = {request : constants.TOGGLE_TASK, success : constants.TOGGLE_TASK_SUCCESS, failure : constants.TOGGLE_TASK_ERROR};
        let payload = {cardId, task, taskIndex}
        AppDispatcher.dispatchAsync(promise, type, payload);
    },
};

export default TaskActionCreators;
