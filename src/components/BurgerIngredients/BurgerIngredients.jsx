import React, { useContext } from 'react';

import styles from './BurgerIngredients.module.css';
import { IngredientsTabs } from "./IngredientsTabs";
import { IngredientsBlock } from "./IngredientsBlock";
import { BurgerContext } from "../../context/BurgerContextProvider";

export const BurgerIngredients = () => {
    const { ingredients } = useContext(BurgerContext);

    return (
        <div className={styles.wrapper}>
            <div className={'pt-10 pb-5'}>
                <p className="text text_type_main-large">
                    Соберите бургер
                </p>
            </div>
            <div className={'pb-10'}>
                <IngredientsTabs />
            </div>
            <div className={styles.ingredientsBlock}>
                <IngredientsBlock title={'Булки'} ingredients={ingredients.bun} />
                <IngredientsBlock title={'Соусы'} ingredients={ingredients.sauce} />
                <IngredientsBlock title={'Начинки'} ingredients={ingredients.main} />
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {};
