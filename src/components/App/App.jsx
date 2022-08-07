import React from 'react';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from "../BurgerIngredients";

import apiData from '../../utils/data';
import styles from './App.module.css';

function App() {
    return (
        <div className="App">
            <AppHeader />
            <main className={styles.content}>
                <BurgerIngredients ingredients={apiData} />
            </main>
        </div>
    );
}

export default App;
