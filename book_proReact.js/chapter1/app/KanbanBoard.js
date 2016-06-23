import React, {Component} from 'react';
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

export default KanbanBoard;
