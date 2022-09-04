import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './IngredientItem.module.css';
import { ingredientType } from "../../../utils/types";
import { ADD_INGREDIENT_DETAILS } from "../../../services/actions/IngredientDetails";


export const IngredientItem = ({ingredient}) => {
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector(state => state.constructor);
    const [ count, setCount ] = useState(0);

    const showIngredientDetails = () => {
        dispatch({ type: ADD_INGREDIENT_DETAILS, ingredient: ingredient })
    }

    useEffect(() => {
        setCount(
            ingredient.type === 'bun' ? (
                bun._id === ingredient._id && 2
            ) : (
                ingredients.filter(item => item._id === ingredient._id ).length
            )
        )
    }, [ ingredient, bun, ingredients ])

    return (
        <div
            onClick={() => showIngredientDetails()}
            className={classNames(styles.wrapper, 'mb-4')}>
            { !!count && <Counter count={ count } size="default" />}
            <img className={"ml-4 mr-4 mb-1"} src={ingredient.image} alt={`Компонент: ${ingredient.name}`}/>
            <div className={classNames(styles.priceBlock, "pt-1 pb-1")}>
                <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default pt-1">{ingredient.name}</span>
        </div>
    );
}

IngredientItem.propTypes = {
    ingredient: ingredientType.isRequired
};