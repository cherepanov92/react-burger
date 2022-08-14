import React from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";

import styles from './IngredientsBlock.module.css';
import { IngredientItem } from "../IngredientItem";
import { ingredientType } from "../../../utils/types";


export const IngredientsBlock = ({title, ingredients, attachModal}) => {
    return (
        <>
            <p className="text text_type_main-medium">{title}</p>
            <div className={classNames(styles.ingredientsBlock ,"pt-6 pr-2 pb-7 pl-2")}>
                {ingredients.map(ingredient => (
                    <IngredientItem key={ingredient._id} ingredient={ingredient} attachModal={attachModal} />
                ))}
            </div>
        </>
    );
};

IngredientsBlock.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    attachModal: PropTypes.func.isRequired
};
