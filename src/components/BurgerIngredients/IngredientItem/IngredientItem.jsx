import React from 'react';
import styles from './IngredientItem.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientType } from "../../../utils/types";
import classNames from "classnames";

export function IngredientItem({ingredient}) {
    return (
        <div className={classNames(styles.wrapper, 'mb-4')}>
            <Counter count={1} size="default" />
            <img className={"ml-4 mr-4 mb-1"} src={ingredient.image} alt={`Компонент: ${ingredient.name}`}/>
            <div className={styles.priceBlock + " pt-1 pb-1"}>
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