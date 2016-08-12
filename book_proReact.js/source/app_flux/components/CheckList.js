/**
 * 카드 아래쪽에 표시되는 CheckList 컴포넌트
 */
import React, {Component, PropTypes} from 'react';
import TaskActionCreators from '../actions/TaskActionCreators';

class CheckList extends Component
{

    checkInputKeyPress(evt) {
        if ( evt.key === 'Enter') {
            let newTask = {id:Date.now(), name:evt.target.value, done:false};
            TaskActionCreators.addTask(this.props.cardId, newTask);
            evt.target.value = '';
        }
    }

    render() {

        let tasks = this.props.tasks.map( (task, taskIndex) => (

            <li key={task.id} className="checklist__task">
                    <input type="checkbox" checked={task.done}
                        onChange={TaskActionCreators.toggleTask.bind(null, this.props.cardId, task.id, taskIndex)}
                    />
                {task.name}{" "}
                    <a href="#" className="checklist__task--remove"
                        onClick={TaskActionCreators.deleteTask.bind(null, this.props.cardId, task.id, taskIndex)}
                    />
            </li>
        ));
        return (
            <div className="checkList">
                <ul>{tasks}</ul>
                <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task"
                    onKeyPress={this.checkInputKeyPress.bind(this)}
                />
            </div>
        );
    }
}

CheckList.propTypes = {
    cardId : PropTypes.number,
    taskCallbacks : PropTypes.object,
    tasks : PropTypes.arrayOf(PropTypes.object)
};

export default CheckList;
