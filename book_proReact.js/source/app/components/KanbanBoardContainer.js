import React from 'react';
import update from 'react-addons-update';
import Immutable from 'immutable';
import {throttle} from '../utils';
import KanbanBoard from './KanbanBoard';

import {Container} from 'flux/utils';
import CardActionCreators from '../actions/CardActionCreators';
import CardStore from '../stores/CardStore';

// polyfill
import 'babel-polyfill';
import 'whatwg-fetch';


// 서버를 로컬에서 실행하는 경우 기본 URL은 localhost:3000 이며, 로컬 서버에서는 권한 부여 헤더가 필요 없다.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-type' : 'application/json',
    //'Authorization': 'CHANGE THIS VALUE'
    'Authorization': 'reactStudy'
    //Authorization : 'any-string-you-like' // 로컬 서버의 경우 권한 부여가 필요 없다.
}

class KanbanBoardContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards : []
        };
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this));
    }

    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    addCard(card) {
        // 낙관적 UI변경을 되돌려야 하는 경우를 대비해 변경하기 전 원래 상태에 대한 참조 저장.
        let prevState = this.state;

        // 카드에 임시 id 부여
        if ( card.id == null ) {
            // let card = Object.assign({}, card, {id:Date.now()});
            let card = Object.assign({}, card, {id:Date.now()});
        }

        // 개로운 객체를 생성하고 카드의 배열로 새로운 카드를 푸시.
         let nextState = Immutable.fromJS(this.state.cards).push(card).toJS();

        // 변경된 객체로 컴포넌트 상태를 설정한다.
        this.setState({cards:nextState});

        // API 호출해 서버에 카드를 추가
        fetch(`${API_URL}/cards`, {
            method : 'post',
            headers : API_HEADERS,
            body : JSON.stringify(card)
        })
        .then( res => {
            if ( res.ok ) {
                return res.json();
            } else {
                throw new Error('Server response wasn`t OK');
            }
        })
        .then( data => {
            card.id = data.id;
            this.setState({cards:nextState});  //? 불변인데? 참조하고 있나??
        })
        .catch( error => this.setState(prevState) );
    }

    updateCard(card) {
        // 낙관적 UI변경을 되돌려야 하는 경우를 대비해 변경하기 전 원래 상태에 대한 참조 저장.
        let prevState = this.state;

        // 카드의 인덱스 찾기
        let cardIndex = this.state.cards.findIndex( cd => cd.id == card.id );
        let nextState = Immutable.fromJS(this.state.cards).setIn([cardIndex], card).toJS();

        // 변경된 객체로 컴포넌트 상태를 설정한다.
        this.setState({cards:nextState});

        // API 호출해 서버에 카드를 추가
        fetch(`${API_URL}/cards/${card.id}`, {
            method : 'put',
            headers : API_HEADERS,
            body : JSON.stringify(card)
        })
        .then( res => {
            if ( !res.ok ) {
                throw new Error('Server response wasn`t OK');
            }
        })
        .catch( error => {
            console.error('Fetch error:', error);
            this.setState(prevState) ;
        });
    }

    addTask(cardId, taskName) {
        console.log('::addTask::');
        // UI 변경을 되돌려야 하는 경우 대비, 변경하기 전 원래 상태에 대한 참조를 저장한다.
        let prevState = this.state;

        // 카드 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );

        // 지정된 이름과 임시 ID로 새로운 태스트를 생성한다.
        let newTask = {id:Date.now(), name:taskName, done:false};
        let updateData = Immutable.fromJS(this.state).getIn(['cards', cardIndex, 'tasks']).push(newTask);
        let nextState = Immutable.fromJS(this.state.cards).setIn([cardIndex, 'tasks'], updateData).toJS();

        // 변경된 객체로 컴포넌트 상태를 설정한다.
        this.setState({cards : nextState});

        // API를 호출해 서버에서 해당 태스크를 추가.
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method : 'post',
            headers : API_HEADERS,
            body : JSON.stringify(newTask)
        })
        .then( req => {
            if ( req.ok ) {
                return req.json();
            } else {
                // 서버에 응답이 정상이 아닌경우, 오류를 생성해 UI 변경을 되돌린다.
                throw new Error("Server reqponse wasn`t OK");
            }
        })
        .then( res => {
            // 서버가 새로운 태스크를 추가하는 이용,
            // 확정 ID를 반환하면 리액트에서 ID를 업데이트 한다.
            console.log(res);
            newTask.id = res.id;
            this.setState({cards:nextState});
        })
        .catch( error => {
            console.log(error);
            this.setState(prevState);
        })
        ;
    }

    deleteTask(cardId, taskId, taskIndex) {
        console.log('::deleteTask::');
        // UI 변경을 되돌려야 하는 경우 대비
        let prevState = this.state;

        // 카드의 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );
        let updateData = Immutable.fromJS(this.state).deleteIn(['cards', cardIndex, 'tasks', taskIndex]).toJS();
        this.setState(updateData);

        // API를 호출해 서버에서 해당 태스크를 제거한다.
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method : 'delete',
            headers : API_HEADERS
        }).then( res => {
            if ( !res.ok ) {
                // 서버에 응답이 정상이 아닌경우, 오류를 생성해 UI 변경을 되돌린다.
                throw new Error("Server reqponse wasn`t OK");
            }
        }).catch( error => {
            Console.error('Fetch error : ', error);
            this.setState(prevState);
        });
    }

    toggleTask(cardId, taskId, taskIndex) {
        console.log('::toggleTask::');
        let prevState = this.state;

        // 카드 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );

        // 태스트의 done 값에 대한 참조를 저장한다.
        let newDoneValue;

        let updateData = Immutable.fromJS(this.state).updateIn(['cards', cardIndex, 'tasks', taskIndex, 'done'], done => newDoneValue = !done).toJS();
        this.setState(updateData);

        // API를 호출해 서버에서 해당 태스크를 제거한다.
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method : 'put',
            headers : API_HEADERS,
            body : JSON.stringify({done:newDoneValue})
        }).then( req => {
            if ( !req.ok ) {
                throw new Error("Server reqponse wasn`t OK");
            }
        }).catch( error => {
            this.setState(prevState);
        });
    }

    updateCardStatus(cardId, listId) {
        console.log('::updateCardStatus::');
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );
        let card = this.state.cards[cardIndex];

        if ( card.status !== listId ) {

            let updateData = Immutable.fromJS(this.state).setIn(['cards', cardIndex, 'status'], listId);
            this.setState(updateData.toJS());
        }
    }

    updateCardPosition(cardId, afterId) {
        console.log('::updateCardPosition::');
        if ( cardId !== afterId ) {
            let cardIndex = this.state.cards.findIndex( card => card.id == cardId );
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex( card => card.id == afterId );

            let updateData = Immutable.fromJS(this.state).deleteIn(['cards', cardIndex]);
            this.setState(
                {
                    'cards' : updateData.get('cards').splice(afterIndex, 0, card).toJS()
                }
            );
        }
    }

    persistCardDrag(cardId, status) {
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );
        let card = this.state.cards[cardIndex];
        console.log('persistCardDrag');
        fetch(`${API_URL}/cards/${cardId}`, {
            method : 'put',
            headers : API_HEADERS,
            body : JSON.stringify({status:card.status, row_order_position:cardIndex})
        }).then( res => {
            if ( !res.ok ) {
                throw new Error("Server reqponse wasn`t OK");
            }
        }).catch( error => {
            console.error("error : " + error);
            let updateData = Immutable.fromJS(this.state).setIn(['cards', cardIndex, 'status'], status);
            this.setState(updateData.toJS());
        });
    }

    render() {

        let KanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards : this.state.cards,
            taskCallbacks : {
                toggle : this.toggleTask.bind(this),
                delete : this.deleteTask.bind(this),
                add : this.addTask.bind(this)
            },
            cardCallbacks : {
                updateStatus:this.updateCardStatus,
                updatePosition:this.updateCardPosition,
                addCard : this.addCard.bind(this),
                updateCard : this.updateCard.bind(this),
                persistCardDrag:this.persistCardDrag.bind(this)
            }
        });
        return KanbanBoard;
    }

    /**
     * 컨테이너 고차 함수는 플럭스 유틸의 스토어를 확장하는 스토어에만 이용할 수 있다.
     * calculateState : 스토어 상태와 로컬 컴포넌트의 상태를 매핑.
     * getStores : 컴포넌트가 수신하는 모든 스토어의 배열을 반환.
     */

    KanbanBoardContainer.getStores = _ => ([CardStore]);
    KanbanBoardContainer.calculateState = prevState => ({cards : CardStore.getState()});
}

export default Container.create(KanbanBoardContainer);
