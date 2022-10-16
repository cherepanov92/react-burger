import React, { useContext } from 'react';
import classNames from "classnames";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './IngredientItem.module.css';
import { IngredientDetails } from "../IngredientDetails";
import { ingredientType } from "../../../utils/types";
import {BurgerContext} from "../../../context/BurgerContextProvider";


export const IngredientItem = ({ingredient}) => {
    const { orderIngredients, setOrderIngredients, setModalComponent } = useContext(BurgerContext);

    const appendIngredient = () => {
        setOrderIngredients({ type: "append", ingredient: ingredient })
        setModalComponent(<IngredientDetails ingredient={ingredient} />)
    }

    const count = orderIngredients[ingredient.type].filter(item => item._id === ingredient._id ).length
    return (
        <div onClick={appendIngredient} className={classNames(styles.wrapper, 'mb-4')}>
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