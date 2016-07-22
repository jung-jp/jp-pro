/**
 * KanbanBoard 컴포넌트를 랜더링 한다.
 */

import React from 'react';
import ReactDom from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer';

let cardsList = [];
ReactDom.render(<KanbanBoardContainer cards={[cardsList]} />, document.getElementById('root'));
