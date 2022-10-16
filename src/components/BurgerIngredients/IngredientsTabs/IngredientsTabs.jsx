import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientsTabs.module.css';

export const IngredientsTabs = ({ current, changeCurrentZone }) => {
    //todo: будем в TS переписать на enum
    return (
        <div className={styles.wrapper}>
            <Tab value="bun" active={current === 'bun'} onClick={changeCurrentZone}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={changeCurrentZone}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={changeCurrentZone}>
                Начинки
            </Tab>
        </div>
    );
};
