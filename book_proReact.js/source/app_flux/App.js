/**
 * KanbanBoard 컴포넌트를 랜더링 한다.
 */
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import KanbanBoardContainer from './componets/KanbanBoardContainer';
import KanbanBoard from './componets/KanbanBoard';
import EditCard from './componets/EditCard';
import NewCard from './componets/NewCard';


ReactDom.render((
    <Router history={browserHistory} >
        <Route component={KanbanBoardContainer}>
            <Route path="/" component={KanbanBoard} >
                <Route path="new" component={NewCard} />
                <Route path="edit/:card_id" component={EditCard} />
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));
