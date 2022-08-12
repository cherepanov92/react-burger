import React, { useState } from 'react';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { Modal } from "../Modal";

import apiData from '../../utils/data';
import styles from './App.module.css';

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="App">
            <AppHeader />
            <main className={styles.content}>
                <BurgerIngredients ingredients={apiData} />
                <BurgerConstructor ingredients={apiData} />
            </main>
            {isModalOpen && <Modal title={'title'} onClose={() => setIsModalOpen(false)}><p>123123</p></Modal>}
        </div>
    );
}

export default App;
