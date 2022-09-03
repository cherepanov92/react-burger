import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App/App";
import { BurgerContextProvider } from "./context/BurgerContextProvider";
import { Provider } from "react-redux";
import createStore from './services/reducers/Root';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={createStore()}>
            <BurgerContextProvider>
                <App />
            </BurgerContextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
