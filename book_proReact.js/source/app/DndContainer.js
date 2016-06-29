import React from 'react';
import ReactDom from 'react-dom';
import DndShoppingCart from './DndShoppingCart';
import DndSnack from './DndSnack';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from  'react-dnd-html5-backend';

class DndContainer extends React.Component
{
    render() {
        return (
            <div>
                <DnsSnack name="Chips" />
                <DnsSnack name="Cupcake" />
                <DnsSnack name="Donut" />
                <DnsSnack name="Doritos" />
                <DnsSnack name="Popcorn" />
                <DndShoppingCart />
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DndContainer);
