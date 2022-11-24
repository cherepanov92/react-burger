import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './components/App/App';
import createStore from './services/reducers/Root';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore()}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
