import React from 'react';
import { DragSource } from 'react-dnd';

/**
 * snack 드래그 앤 드롭 사양
 *  - 필수 : beginDrag
 *  - 선택 : endDrag
 *  - 선택 : canDrag
 *  - 선택 : isDragging
 * @type {Object}
 */
const snackSpec = {
    beginDrag(props) {
        return {
            name : props.name
        };
    },

    endDrag(props, monitor) {
        const dragItem = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if ( dropResult ) {
            console.log( `스낵 ${dragItem.name}이 ${dropResult.name}에 담겼다.` );
        }
    }
};

/**
 * Snack DragSource collect 콜렉팅 함수
 * - connect DragSourceConnector의 인스턴스,
 * 	드래그 원본 역할을 DOM 노드에 할당하는 데 이용한다.
 * - monitor DragSourceMonitor의 인스턴스,
 * 리액트 Dnd에서 속성으로 컴포넌트의 상태를 연결하는 데 이용한다.
 * 상태를 얻는 데 이용할 수 있는 함수로 canDrag(), isDragging(), getItemType(), getItem(), didDrop() 등이 있다.
 * @param  {[type]} connect [description]
 * @param  {[type]} monitor [description]
 * @return {[type]}         [description]
 */
let collect = ( connect, monitor ) => {
    return {
        connectDragSource : connect.dragSource(),
        isDragging : monitor.isDragging()
    };
}

class DndSnack extends React.Component {
    render() {
        const { name, isDragging, connectDragSource } = this.props;
        const opacity = isDragging ? 0.4 : 1;
        const style = {
            opacity : opacity
        };

        return connectDragSource(
            <div className='snack' style={style}>{name}</div>
        );
    }
}

DndSnack.propTypes = {
    connectDragSource : React.PropTypes.func.isRequired,
    isDragging : React.PropTypes.bool.isRequired,
    name : React.PropTypes.string.isRequired
}

export default DragSource('snack', snackSpec, collect)(DndSnack);
