import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App/App";
import { Provider } from "react-redux";
import createStore from './services/reducers/Root';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore()}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
