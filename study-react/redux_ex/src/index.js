import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/App';
import counterApp from './reducers';

const store = createStore(counterApp);
const appElement = document.getElementById('app');

ReactDom.render(
    <Provider store={store}><App /></Provider>, appElement
);
