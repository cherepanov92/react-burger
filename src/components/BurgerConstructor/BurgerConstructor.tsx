import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import classNames from 'classnames';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import { ADD_INGREDIENT } from '../../services/actions/Constructor';
import { sendOrderRequest } from '../../services/actions/Order';
import { getOrderIngredientsIDs } from '../../utils/getIngredientsGroups';
import { ConstructorIngredient } from './ConstructotIngredient/ConstructotIngredient';
import { APPEND_ERROR_MODAL_TYPE } from '../../services/actions/Modal';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { OrderedIngredient } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../services/reducers/Root';

const BurgerConstructor = () => {
    const user = useAppSelector(state => state.user);
    const { bun, ingredients, totalPrice } = useAppSelector(state => state.constructor);
    const dispatch = useAppDispatch();
    const [redirectToAuth, setRedirectToAuth] = useState(false);
    const isAuth = !!user.data;
    const hasBun = !!bun;
    const hasIngredients = !!ingredients.length;
    const canOrder = hasBun && hasIngredients;

    const onSendOrderRequest = () => {
        if (!isAuth) {
            dispatch({
                type: APPEND_ERROR_MODAL_TYPE,
                message: 'Оформить заказ может только авторизированный пользователь'
            });
            setRedirectToAuth(true);
        } else {
            canOrder && dispatch(sendOrderRequest(getOrderIngredientsIDs([bun, ...ingredients])));
        }
    };

    const onDropHandler = (ingredient: OrderedIngredient) => {
        dispatch({ type: ADD_INGREDIENT, ingredient: ingredient });
    };

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient: OrderedIngredient) {
            onDropHandler(ingredient);
        }
    });

    if (redirectToAuth) {
        return <ProtectedRoute />;
    }

    return (
        <section className={styles.wrapper} data-ft-id={'constructor'} ref={dropTarget}>
            <section className={classNames(styles.ingredientsBlock, 'pt-25')}>
                {!canOrder && (
                    <p className="text text_type_main-small mb-10 mt-5 ">
                        {`Пожалуйста, перенесите сюда 
                            ${!hasIngredients ? 'ингредиенты' : ''}
                            ${!hasIngredients ? (!hasBun ? ' и' : '') : ''}
                            ${!hasBun ? ' булку' : ''} для создания заказа`}
                    </p>
                )}
                {!!totalPrice && (
                    <>
                        <div className={'mr-4'}>
                            {hasBun && (
                                <ConstructorElement
                                    type={'top'}
                                    isLocked={true}
                                    text={`${bun.name} (верх)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                            )}
                        </div>
                        <div className={styles.selectedBlock}>
                            {!!ingredients.length &&
                                ingredients
                                    .sort((a: OrderedIngredient, b: OrderedIngredient) => a?.orderIndex - b?.orderIndex)
                                    .map((ingredient: OrderedIngredient) => (
                                        <ConstructorIngredient key={ingredient.orderId} ingredient={ingredient} />
                                    ))}
                        </div>
                        <div className={'mr-4'}>
                            {hasBun && (
                                <ConstructorElement
                                    type={'bottom'}
                                    isLocked={true}
                                    text={`${bun.name} (низ)`}
                                    price={bun.price}
                                    thumbnail={bun.image}
                                />
                            )}
                        </div>
                    </>
                )}
            </section>
            <section className={classNames(styles.priceBlock, 'mt-10 mr-4 mb-10')}>
                <div className={'mr-10'}>
                    <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    onClick={onSendOrderRequest}
                    type={'primary'}
                    disabled={!canOrder}
                    size="large"
                    htmlType="button"
                >
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
};

export default BurgerConstructor;
