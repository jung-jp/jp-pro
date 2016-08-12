import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-type' : 'application/json',
    //'Authorization': 'CHANGE THIS VALUE'
    'Authorization': 'reactStudy'
}


let KanbanApi = {
    fetchCards() {
        return (
            fetch(API_URL + '/cards', {headers:API_HEADERS})
            .then( res => res.json() )
        )
    }
};

export default kanbanApi
