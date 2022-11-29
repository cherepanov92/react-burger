import React, { FC } from 'react';
import classNames from 'classnames';

import styles from './IngredientsBlock.module.css';
import IngredientItem from '../IngredientItem/IngredientItem';
import { ingredientType } from '../../../utils/types';

type ingredientsBlockProps = {
    title: string;
    ingredients: ingredientType[];
};

const IngredientsBlock: FC<ingredientsBlockProps> = ({ title, ingredients }) => {
    return (
        <>
            <p className="text text_type_main-medium">{title}</p>
            <div className={classNames(styles.ingredientsBlock, 'pt-6 pr-2 pb-7 pl-2')}>
                {ingredients.map(ingredient => (
                    <IngredientItem key={ingredient._id} ingredient={ingredient} />
                ))}
            </div>
        </>
    );
};

export default IngredientsBlock;
