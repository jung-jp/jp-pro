import React from 'react';
import KanbanBoard from './KanbanBoard';
import 'babel-polyfill';
import 'whatwg-fetch';

// 서버를 로컬에서 실행하는 경우 기본 URL은 localhost:3000 이며, 로컬 서버에서는 권한 부여 헤더가 필요 없다.
const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-type' : 'application/json',
    Authorization: 'CHANGE THIS VALUE'
    //Authorization : 'any-string-you-like' // 로컬 서버의 경우 권한 부여가 필요 없다.
}

class KanbanBoardContainer extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards : []
        }
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers:API_HEADERS})
        .then( response => {
            return response.json();
        })
        .then( responseData => {
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
        let nextState = update(this.state.cards, {
            [cardIndex] : {
                tasks : { $push : [newTask] }
            }
        });

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
        .then( data => {
            // 서버가 새로운 태스크를 추가하는 이용,
            // 확정 ID를 반환하면 리액트에서 ID를 업데이트 한다.
            newTask.id = req.id;
            this.setState({cards:nextState});
        })
        .catch( error => {
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
        }).then( req => {
            if ( !req.ok ) {
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
        let newDonValue;
        // $apply 명열을 이용해 done 값을 현재와 반대로 변경한다.
        let nextState = update(this.state.cards, {
            [cardIndex] : {
                tasks : {
                    [taskIndx] : {
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
            body : JSON.stringify({done:newDeonValue})
        }).then( req => {
            if ( !req.ok ) {
                throw new Error("Server reqponse wasn`t OK");
            }
        }).catch( error => {
            this.setState(prevState);
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
            />
        );
    }
}

export default KanbanBoardContainer;
