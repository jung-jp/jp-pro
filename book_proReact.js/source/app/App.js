/**
 * KanbanBoard 컴포넌트를 랜더링 한다.
 */

import React from 'react';
import ReactDom from 'react-dom';
import KanbanBoard from './KanbanBoard';

// 데이터 하드코딩 (임시사용)
let cardsList = [
  {
    id: 1,
    title: "Read the Book",
    description: "I should read the whole book",
    status: "in-progress",
    tasks: []
  },
  {
    id: 2,
    title: "Write some code",
    description: "Code along with the samples in the book",
    status: "todo",
    tasks: [
      {
        id: 1,
        name: "ContactList Example",
        done: true
      },
      {
        id: 2,
        name: "Kanban Example",
        done: false
      },
      {
        id: 3,
        name: "My own experiments",
        done: false
      }
    ]
  }
];

ReactDom.render(<KanbanBoard cards={cardList} />, document.getElementById('root'));
