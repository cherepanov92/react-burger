import React, { FC } from 'react';
import classNames from 'classnames';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientItem.module.css';
import { IngredientType, LocationProps } from '../../../utils/types';
import { getOrderIngredientsIDs } from '../../../utils/getIngredientsGroups';
import { ADD_INGREDIENT_DETAILS } from '../../../services/actions/IngredientDetails';
import { useAppDispatch, useAppSelector } from '../../../services/reducers/Root';

const IngredientItem: FC<{ ingredient: IngredientType }> = ({ ingredient }) => {
    const location = useLocation() as unknown as LocationProps;
    const dispatch = useAppDispatch();
    const ingredientId = ingredient._id;

    const { ingredients, bun } = useAppSelector(state => state.constructor);
    const showIngredientDetails = () => {
        dispatch({ type: ADD_INGREDIENT_DETAILS, ingredient: ingredient });
    };
    const getCount = (ingredient: IngredientType, orderIngredientList: IngredientType[] = []) => {
        if (ingredient.type === 'bun') {
            return ingredient._id === bun?._id ? 2 : null;
        }
        return orderIngredientList.length
            ? getOrderIngredientsIDs(orderIngredientList).filter(id => id === ingredient._id).length
            : 0;
    };
    const count = getCount(ingredient, ingredients);
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

export default IngredientItem;
