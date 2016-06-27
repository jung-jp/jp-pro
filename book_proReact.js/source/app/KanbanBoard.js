/**
 * KanbanBoard 컴포넌트는 props를 통해 cardList를 받고 상태를 필터링해
 * List 컴포넌트 세게 To Do, In Progress, Done 를 만든다.
 */

import React, {Component, PropTypes} from 'react';
import List from './List';

class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">
                <List id="todo" title="To Do" cards={this.props.cards.filter( (cd) => cd.status === "todo")} />
                <List id="in-progress" title="In Progress" cards={this.props.cards.filter( (cd) => cd.status === "in-progress")} />
                <List id="done" title="Done" cards={this.props.cards.filter( (cd) => cd.status === "done")} />
            </div>
        );
    }
}

KanbanBoard.propType = {
    cards : PropTypes.arrayOf(PropTypes.object)
}

export default KanbanBoard;
