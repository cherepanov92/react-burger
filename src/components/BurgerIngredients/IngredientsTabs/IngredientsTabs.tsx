import React, { FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientsTabs.module.css';
import { EnumIngredientType } from '../../../utils/types';

type IngredientsTabsProps = {
    current: EnumIngredientType;
    changeCurrentZone: any;
};

export const IngredientsTabs: FC<IngredientsTabsProps> = ({ current, changeCurrentZone }) => {
    return (
        <div className={styles.wrapper}>
            <Tab value={EnumIngredientType.BUN} active={current === EnumIngredientType.BUN} onClick={changeCurrentZone}>
                Булки
            </Tab>
            <Tab
                value={EnumIngredientType.SAUCE}
                active={current === EnumIngredientType.SAUCE}
                onClick={changeCurrentZone}
            >
                Соусы
            </Tab>
            <Tab
                value={EnumIngredientType.MAIN}
                active={current === EnumIngredientType.MAIN}
                onClick={changeCurrentZone}
            >
                Начинки
            </Tab>
        </div>
    );
};
