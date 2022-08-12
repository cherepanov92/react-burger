import React from 'react';
import styles from './BurgerIngredients.module.css';
import {IngredientsTabs} from "./IngredientsTabs";
import { ingredientType } from "../../utils/types";
import PropTypes from "prop-types";
import { IngredientsBlock } from "./IngredientsBlock";

export const BurgerIngredients = ({ ingredients }) => {
    const { bun, main, sauce } = ingredients.reduce((previousValue, currentValue) => {
        return {...previousValue, [currentValue.type]: [...previousValue[currentValue.type], currentValue]}
    }, { bun:[], main:[], sauce:[] });

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
                <IngredientsBlock title={'Булки'} ingredients={bun} />
                <IngredientsBlock title={'Соусы'} ingredients={sauce} />
                <IngredientsBlock title={'Начинки'} ingredients={main} />
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};
