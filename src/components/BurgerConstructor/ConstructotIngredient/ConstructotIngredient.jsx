import React from 'react';
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import classNames from "classnames";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './ConstructorIngredient.module.css';
import { REMOVE_INGREDIENT } from "../../../services/actions/Constructor";

export const ConstructorIngredient = ({ingredient}) => {
    const dispatch = useDispatch();
    const onDeleteIngredient = ingredient => {
        dispatch({
            type: REMOVE_INGREDIENT,
            ingredient: ingredient
        });
    }

    const [{isDrag}, dragRef, preview] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        !isDrag &&
        <div ref={preview} className={classNames(styles.ingredient, 'mr-2')} >
            <div ref={dragRef}><DragIcon type="primary"/></div>
            <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => onDeleteIngredient(ingredient)}
            />
        </div>
    )
}