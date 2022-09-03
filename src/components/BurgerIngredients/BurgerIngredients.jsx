import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from './BurgerIngredients.module.css';
import { IngredientsTabs } from "./IngredientsTabs";
import { IngredientsBlock } from "./IngredientsBlock";
import { getIngredientsData } from "../../services/actions/Ingredients";

export const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const { ingredients, ingredientsRequest } = useSelector(state => state.ingredients);

    useEffect(() => {
        dispatch(getIngredientsData());
        }, [dispatch]
    );


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
                {ingredientsRequest ? (
                    <p className="text text_type_main-large mt-5">
                        Loading ...
                    </p>
                ) : (
                    <>
                        <IngredientsBlock title={'Булки'} ingredients={ingredients.bun} />
                        <IngredientsBlock title={'Соусы'} ingredients={ingredients.sauce} />
                        <IngredientsBlock title={'Начинки'} ingredients={ingredients.main} />
                    </>
                )}
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {};
