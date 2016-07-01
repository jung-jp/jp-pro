import React from 'react';
import { DropTarget } from 'react-dnd';

const ShoppingCartSpec = {
    drop() {
        return { name : 'ShoppingCart' };
    }
}

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
