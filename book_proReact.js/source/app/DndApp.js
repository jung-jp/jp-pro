import React from 'react';
import ReactDom from 'react-dom';
import DndContainer from './DndContainer';

class DdnApp extends React.Component
{
    render() {
        return (
            <DndContainer />
        )
    }
}

ReactDom.render(<DdnApp />, document.getElementById('root'));
