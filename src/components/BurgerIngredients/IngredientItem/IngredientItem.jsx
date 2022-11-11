import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientItem.module.css';
import { ingredientType } from '../../../utils/types';
import { getOrderIngredients } from '../../../utils/getIngredientsGroups';
import { ADD_INGREDIENT_DETAILS } from '../../../services/actions/IngredientDetails';

export const IngredientItem = ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredientId = ingredient._id;

    const { ingredients } = useSelector(state => state.constructor);
    const count = getOrderIngredients([null, ingredients]).filter(id => id === ingredient._id).length;

    const showIngredientDetails = () => {
        dispatch({ type: ADD_INGREDIENT_DETAILS, ingredient: ingredient });
    };

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <Link
            ref={dragRef}
            key={ingredientId}
            to={{
                pathname: `/ingredients/${ingredientId}`,
                state: { background: location }
            }}
            onClick={() => showIngredientDetails()}
            className={classNames(styles.wrapper, 'mb-4')}
        >
            {!!count && <Counter count={count} size="default" />}
            <img className={'ml-4 mr-4 mb-1'} src={ingredient.image} alt={`Компонент: ${ingredient.name}`} />
            <div className={classNames(styles.priceBlock, 'pt-1 pb-1')}>
                <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default pt-1">{ingredient.name}</span>
        </Link>
    );
};

IngredientItem.propTypes = {
    ingredient: ingredientType.isRequired
};
