import React from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './IngredientItem.module.css';
import { IngredientDetails } from "../IngredientDetails";
import { ingredientType } from "../../../utils/types";


export const IngredientItem = ({ingredient, attachModal, onClose}) => {
    return (
        <div onClick={() => attachModal(<IngredientDetails ingredient={ingredient} onClose={onClose} />)} className={classNames(styles.wrapper, 'mb-4')}>
            <Counter count={1} size="default" />
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
    ingredient: ingredientType.isRequired,
    attachModal: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};