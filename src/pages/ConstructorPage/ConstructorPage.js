import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './ConstructorPage.module.css';
import { IngredientDetails } from '../../components/BurgerIngredients/IngredientDetails';
import { OrderDetails } from '../../components/BurgerConstructor/OrderDetails';
import { ErrorModal } from '../../components/Modal/ErrorModal/ErrorModal';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import { BurgerIngredients } from '../../components/BurgerIngredients';

const getModal = modalType => {
    switch (modalType) {
        case 'ingredientDetails':
            return <IngredientDetails />;
        case 'order':
            return <OrderDetails />;
        case 'error':
            return <ErrorModal />;
        default:
            return null;
    }
};

const ConstructorPage = () => {
    const { modalType } = useSelector(state => state.modal);

    return (
        <main className={styles.content}>
            <DndProvider backend={HTML5Backend}>
                <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </>
            </DndProvider>
            {modalType && getModal(modalType)}
        </main>
    );
};

export default ConstructorPage;