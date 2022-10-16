import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import classNames from 'classnames';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientItem.module.css';
import { ingredientType } from '../../../utils/types';
import { ADD_INGREDIENT_DETAILS } from '../../../services/actions/IngredientDetails';
import { APPEND_MODAL_TYPE } from '../../../services/actions/Modal';
import { getOrderIngredients } from '../../../utils/getIngredientsGroups';

export const IngredientItem = ({ ingredient }) => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state.constructor);
    const count = getOrderIngredients([null, ingredients]).filter(id => id === ingredient._id).length;

    const showIngredientDetails = () => {
        dispatch({ type: ADD_INGREDIENT_DETAILS, ingredient: ingredient });
        dispatch({ type: APPEND_MODAL_TYPE, modalType: 'ingredientDetails' });
    };

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div ref={dragRef} onClick={() => showIngredientDetails()} className={classNames(styles.wrapper, 'mb-4')}>
            {!!count && <Counter count={count} size="default" />}
            <img className={'ml-4 mr-4 mb-1'} src={ingredient.image} alt={`Компонент: ${ingredient.name}`} />
            <div className={classNames(styles.priceBlock, 'pt-1 pb-1')}>
                <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default pt-1">{ingredient.name}</span>
        </div>
    );
};

IngredientItem.propTypes = {
    ingredient: ingredientType.isRequired
};
