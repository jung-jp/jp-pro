import react from 'react';
import reactdom from 'react-dom';
import Container from './DndContainer';

class DdnApp extends react.Component
{
    render() {
        return (
            <DndContainer />
        )
    }
}

reactdom.render(<App />, document.getElementById('root'));
