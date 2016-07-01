/**
 * 목록에 이름을 표시하고 그 안에 들어 있는 card 컴포넌트를 랜더링 한다.
 * List 컴포넌트는 속성을 통해 cards 배열을 받은 다음 제목이나 설명과 같은 개별 정보를 다시 속성을 통해 Card 컴포넌트로 전달한다.
 */

import React, {Component, PropTypes} from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card';
import constants from './constants';

const listTargetSpec = {
    hover(props, monitor) {
        const draggedId = monitor.getItem().id;
        props.cardCallbacks.updateStatus(draggedId, props.id);
    }
};

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
