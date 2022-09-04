import React from 'react';
import { useSelector } from "react-redux";

import styles from './App.module.css';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { IngredientDetails } from "../BurgerIngredients/IngredientDetails";
import { OrderDetails } from "../BurgerConstructor/OrderDetails";
import { ErrorModal } from "../Modal/ErrorModal/ErrorModal";

const getModal = (modalType) => {
    switch (modalType) {
        case 'ingredientDetails':
            return <IngredientDetails />
        case 'order':
            return <OrderDetails />
        case 'error':
            return <ErrorModal />
        default:
            return null;
    }
}

function App() {
    const { modalType } = useSelector(state => state.modal);

    return (
        <div className="App">
            <AppHeader />
            <main className={styles.content}>
                    <>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </>
            </main>
            { modalType && getModal(modalType) }
        </div>
    );
}

export default App;
