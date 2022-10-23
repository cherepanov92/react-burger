import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './ConstructorPage.module.css';
import { BurgerConstructor } from '../../components/BurgerConstructor';
import { BurgerIngredients } from '../../components/BurgerIngredients';

const ConstructorPage = () => {
    return (
        <main className={styles.content}>
            <DndProvider backend={HTML5Backend}>
                <>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </>
            </DndProvider>
        </main>
    );
};

export default ConstructorPage;