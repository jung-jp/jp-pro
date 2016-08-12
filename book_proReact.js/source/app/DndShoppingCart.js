import React from 'react';
import { DropTarget } from 'react-dnd';

/**
 * 드롭 대상 사양을 구현하는 일반 객체.
 * 	- DropTarget : 메서드(모두 선택적)
 *  - drop : 호환되는 항목이 드롭되면 호출.
 *  - hover : 항목으로 컴포넌트를 가리키면 호출.
 *  - canDrop : 드롭 대상이 항목을 수락할 수 있는지 여부를 지정하는 데 이용.
 * @type {Object}
 */
const ShoppingCartSpec = {
    drop() {
        return { name : 'ShoppingCart' };
    }
}

/**
 * 리액트 DnD 커넥터와 상태를 컴포넌트의 속성과 연결하는 함수.
 * @param  {[type]} connect DropTargetConnector의 인스턴스, 드롭 대상 역할을 DOM 노드에 할당하는 데 이용
 *                          (컴포넌트의 render 함수에서 컴포넌트 DOM의 일부분을 구분하는 데 이용할 속성과 매핑해야 한다.
 *                          dragSource 드레그하는 동안 컴포넌트(상품), dropTarget 드롭영역(쇼핑카트))
 *
 * @param  {[type]} monitor 드래그 앤 드롭 상태와 매핑할 수 있게 해준다. (dnd는 상태저장 작업이다.)
 *                          (DropTaretMonitor의 인스턴스, 리액트 DnD 속성으로 상태를 연결하는 데 이용. 이용할 수 있는 함수로는 canDrop(), isOver(), didDrop())
 *
 * @return {[type]}         [description]
 */
let collect = ( connect, monitor ) => {
    return {
        connectDropTarget : connect.dropTarget(),
        isOver : monitor.isOver(),
        canDrop : monitor.canDrop()
    }
}

class DndShoppingCart extends React.Component {
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#fff';
        if ( isActive ) {
            backgroundColor = '#f7f7bd';
        } else if ( canDrop ) {
            backgroundColor = '#f7f7f7';
        }

        const style = {
            backgroundColor : '#fff'
        };
        // collect를 통해 전달받은  connectDropTarget 메소드 실행.
        return connectDropTarget(
            <div className='shopping-cart' style={style}>
                { isActive ? 'Hummmm, snack!' : 'Drag hear to order!' }
            </div>
        );
    }
}

DndShoppingCart.PropTypes = {
    connectDropTarget : React.PropTypes.func.isRequired,
    isOver : React.PropTypes.bool.isRequired,
    canDrop : React.PropTypes.bool.isRequired,
}

export default DropTarget("snack", ShoppingCartSpec, collect)(DndShoppingCart);
