import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {transitions, positions, Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';
import * as serviceWorker from './serviceWorker';

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
    width: '600px',
};

const Root = () => (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
        <App/>
    </AlertProvider>
);

ReactDOM.render(Root(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
