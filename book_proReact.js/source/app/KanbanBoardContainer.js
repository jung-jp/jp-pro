import React from 'react';
// import update from 'react-addons-update';
import itable from 'immutable';
import {throttle} from './utils';
import KanbanBoard from './KanbanBoard';

// polyfill
import 'babel-polyfill';
import 'whatwg-fetch';


// 서버를 로컬에서 실행하는 경우 기본 URL은 localhost:3000 이며, 로컬 서버에서는 권한 부여 헤더가 필요 없다.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-type' : 'application/json',
    // 'Authorization': 'CHANGE THIS VALUE'
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
        fetch(API_URL + '/cards', {headers:API_HEADERS})
        .then( response => {
            console.log(response);
            return response.json();
        })
        .then( responseData => {
            console.log(responseData);
            this.setState({cards : responseData});
            // console.log(responseData);
        })
        .catch( error => console.log('Error fetching and parsing data', error) )
    }

    addTask(cardId, taskName) {
        // UI 변경을 되돌려야 하는 경우 대비, 변경하기 전 원래 상태에 대한 참조를 저장한다.
        let prevState = this.state;

        // 카드 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );

        // 지정된 이름과 임시 ID로 새로운 태스트를 생성한다.
        let newTask = {id:Date.now(), name:taskName, done:false};

        // 새로운 객체를 생성하고 태스크의 배열로 새로운 태스크를 푸시한다.
        // let nextState = update(this.state.cards, {
        //     [cardIndex] : {
        //         tasks : { $push : [newTask] }
        //     }
        // });
        //let nextState = his.state.cards.updateIn([cardIndex, tasks],

        )

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
        // UI 변경을 되돌려야 하는 경우 대비
        let prevState = this.state;

        // 카드의 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );

        // 해당 태스트를 제외한 새로운 객체를  생성한다.
        let nextState = update(this.state.cards, {
            [cardIndex] : {
                tasks : { $splice : [[taskIndex, 1]] }
            }
        });

        // 변경된 객체로 컴포넌트 상태를 설정한다.
        this.setState({cards : nextState});

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
        })
        ;
    }

    toggleTask(cardId, taskId, taskIndex) {

        let prevState = this.state;

        // 카드 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );

        // 태스트의 done 값에 대한 참조를 저장한다.
        let newDoneValue;
        // $apply 명열을 이용해 done 값을 현재와 반대로 변경한다.
        let nextState = update(this.state.cards, {
            [cardIndex] : {
                tasks : {
                    [taskIndex] : {
                        done : { $apply : done => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });

        // 변경된 객체로 컴포넌트 상태를 설정한다.
        this.setState({cards : nextState});

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
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );
        let card = this.state.cards[cardIndex];

        if ( card.status !== listId ) {
            this.setState( update(this.state, {
                cards : {
                    [cardIndex] : {
                        status : {$set:listId}
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId, afterId) {
        if ( cardId !== afterId ) {
            let cardIndex = this.state.cards.findIndex( card => card.id == cardId );
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex( card => card.id == afterId );

            // splice를 이용해 카드를 제거한 후 새로운 인덱스 위치로 삽입한다.
            this.setState(update(this.state, {
                cards: {
                    $splice : [
                        [cardIndex, 1], [afterIndex, 0, card]
                    ]
                }
            }))
        }
    }

    persistCardDrag(cardId, status) {
        let cardIndex = this.state.cards.findIndex( card => card.id == cardId );
        let card = this.state.cards[cardIndex];

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
            this.setState(
                update(this.state, {
                    cards : {
                        [cardIndex] : {
                            status : {$set:status}
                        }
                    }
                })
            );
        });
    }

    render() {

        return (
            <KanbanBoard cards={this.state.cards}
                taskCallbacks={{
                    toggle : this.toggleTask.bind(this),
                    delete : this.deleteTask.bind(this),
                    add : this.addTask.bind(this)
                }}
                cardCallbacks={{
                    updateStatus:this.updateCardStatus,
                    updatePosition:this.updateCardPosition,
                    persistCardDrag:this.persistCardDrag.bind(this)
                }}
            />
        );
    }
}

export default KanbanBoardContainer;
