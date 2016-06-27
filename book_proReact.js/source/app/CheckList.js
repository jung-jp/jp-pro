/**
 * 카드 아래쪽에 표시되는 CheckList 컴포넌트
 */
import React, {Component, PropTypes} from 'react';

class CheckList extends Component
{
    render() {
        let tasks = this.props.tasks.map( task => {
            <li key={task.id}>
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}{" "}
                <a href="#" className="checklist__task--remove" />
            </li>
        });
        return (
            <div className="checkList">
                <ul>{tasks}</ul>
                <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task" />
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId : PropTypes.number,
    taksks : PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
