import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './ConstructorPage.module.css';

import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';

const ConstructorPage: FC = () => {
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
