import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-type' : 'application/json',
    'Authorization': 'CHANGE THIS VALUE'
    //'Authorization': 'reactStudy'
}


let KanbanApi = {
    fetchCards() {
        return (
            fetch(API_URL + '/cards', {headers:API_HEADERS})
            .then( res => res.json() )
        )
    },

    addCard(card) {
        return (
            fetch(API_URL + '/cards', {
                headers : API_HEADERS,
                method : 'post',
                body : JSON.stringify(card)
            })
            .then( res => res.json() )
        )
    },

    updateCard(card, draftCard) {
        return (
            fetch(API_URL + '/cards', {
                headers : API_HEADERS,
                method : 'put',
                body : JSON.stringify(draftCard)
            })
            .then( res => res.json() )
        )
    },

    persistCardDrag(cardIid, status, index) {
        return (
            fetch(API_URL + '/cards', {
                headers : API_HEADERS,
                method : 'put',
                body : JSON.stringify({status, row_order_position:index})
            })
        )
    },

    addTask(cardIid,task) {
        return (
            fetch(`${API_URL}/cards/${cardId}/tasks`, {
                headers : API_HEADERS,
                method : 'post',
                body : JSON.stringify(task)
            })
            .then( res => res.json() )
        )
    },

    deleteTask(cardIid,task) {
        return (
            fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
                headers : API_HEADERS,
                method : 'delete',
            })
        )
    },

    toggleTask(cardId, task) {
        return (
            fetch(`${API_URL}/cards/${cardId}/tasks/${task.id}`, {
                headers : API_HEADERS,
                method : 'put',
                body : JSON.stringify({done:!task.done})
            })
        )
    }



};

export default KanbanApi
