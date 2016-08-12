/**
 * 목록에 이름을 표시하고 그 안에 들어 있는 card 컴포넌트를 랜더링 한다.
 * List 컴포넌트는 속성을 통해 cards 배열을 받은 다음 제목이나 설명과 같은 개별 정보를 다시 속성을 통해 Card 컴포넌트로 전달한다.
 */

import React, {Component, PropTypes} from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import constants from './constants';

/**
 * 드롭 대상 사양을 구현하는 일반 객체.
 * 	- DropTarget : 메서드(모두 선택적)
 *  - drop : 호환되는 항목이 드롭되면 호출.
 *  - hover : 항목으로 컴포넌트를 가리키면 호출.
 *  - canDrop : 드롭 대상이 항목을 수락할 수 있는지 여부를 지정하는 데 이용.
 * @type {Object}
 */
const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        // console.log('draggedId : ', monitor.getItem().id);
        props.cardCallbacks.updateStatus(draggedId, props.id);
    }
};

/**
 * 리액트 DnD 커넥터와 상태를 리액트 컴포넌트의 속성과 연결하는 함수.
 * @param  {[type]} connect DropTargetConnector의 인스턴스, 드롭 대상 역할을 DOM 노드에 할당하는 데 이용
 * @param  {[type]} monitor 드래그 앤 드롭 상태와 매필할 수 있게 해준다. (dnd는 상태저장 작업이다.)
 * @return {[type]}         [description]
 */
function collect(connect, monitor) {
    return {
        connectDropTarget : connect.dropTarget()
    }
}

class List extends Component {
    render() {
        const { connectDropTarget } = this.props;

        let cards = this.props.cards.map( card =>
            <Card key={card.id}
                id={card.id} title={card.title} description={card.description} color={card.color} tasks={card.tasks}
                taskCallbacks={this.props.taskCallbacks}
                cardCallbacks={this.props.cardCallbacks}
                />
        );
        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

List.propTypes = {
    id : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    cards : PropTypes.arrayOf(PropTypes.object),
    taskCallbacks : PropTypes.object,
    cardCallbacks : PropTypes.object,
    connectDropTarget : PropTypes.func.isRequired
};

export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
