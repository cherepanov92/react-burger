import React from 'react';
import styles from './IngredientsBlock.module.css';
import { IngredientItem } from "../IngredientItem";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/types";


export const IngredientsBlock = ({title, ingredients}) => {
    return (
        <>
            <p className="text text_type_main-medium">{title}</p>
            <div className={classNames(styles.ingredientsBlock ,"pt-6 pr-2 pb-7 pl-2")}>
                {ingredients.map(item => (
                    <IngredientItem key={item._id} ingredient={item} />
                ))}
            </div>
        </>
    );
};

IngredientsBlock.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};
