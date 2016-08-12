/**
 * KanbanBoard 컴포넌트는 props를 통해 cardList를 받고 상태를 필터링해
 * List 컴포넌트 세게 To Do, In Progress, Done 를 만든다.
 */

import React, {Component, PropTypes} from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import { Link } from 'react-router';

class KanbanBoard extends Component {
    render() {
        let cardModal = this.props.children && React.cloneElement(this.props.children, {
            cards : this.props.cards,
            cardCallbacks : this.props.cardCallbacks

        })
        return (
            <div className="app">
                <Link to='/new' className='float-button'>+</Link>
                <List id="todo" title="To Do"
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    cards={this.props.cards.filter( (cd) => cd.status === "todo")} />
                <List id="in-progress" title="In Progress"
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    cards={this.props.cards.filter( (cd) => cd.status === "in-progress")} />
                <List id="done" title="Done"
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    cards={this.props.cards.filter( (cd) => cd.status === "done")} />
                {cardModal}
            </div>
        );
    }
}

KanbanBoard.propType = {
    cards : PropTypes.arrayOf(PropTypes.object),
    taskCallbacks : PropTypes.object,
    cardCallbacks : PropTypes.object
}

export default DragDropContext(HTML5Backend)(KanbanBoard);
