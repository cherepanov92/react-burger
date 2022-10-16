import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App/App";
import { BurgerContextProvider } from "./context/BurgerContextProvider";

ReactDOM.render(
    <React.StrictMode>
        <BurgerContextProvider>
            <App />
        </BurgerContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
