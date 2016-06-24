/**
 * 카드 아래쪽에 표시되는 CheckList 컴포넌트
 */
import React, {Component} from 'react';

class CheckList extends Component
{
    render() {
        let tasks = this.props.tasks.map( task => {
            <li>
                <input type="checkbox" defaultChecked={task.done} />
                {task.name}
                <a href="#" className="checklist__task--remove" />
            </li>
        });
        return (<div className="checkList"><ul>{tasks}</ul></div>);
    }
}
