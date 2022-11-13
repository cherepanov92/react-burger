import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import { ADD_INGREDIENT } from '../../services/actions/Constructor';
import { sendOrderRequest } from '../../services/actions/Order';
import { getOrderIngredients } from '../../utils/getIngredientsGroups';
import { ConstructorIngredient } from './ConstructotIngredient/ConstructotIngredient';

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { bun, ingredients, totalPrice } = useSelector(state => state.constructor);
    const hasBun = !!bun;
    const hasIngredients = !!ingredients.length;
    const canOrder = hasBun && hasIngredients;

    const onSendOrderRequest = () => {
        canOrder && dispatch(sendOrderRequest(getOrderIngredients([bun, ingredients])));
    };

    const onDropHandler = ingredient => {
        dispatch({ type: ADD_INGREDIENT, ingredient: ingredient });
    };

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(ingredient) {
            onDropHandler(ingredient);
        }
    });

    return (
        <section className={styles.wrapper} ref={dropTarget}>
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
                                    .sort((a, b) => a.orderIndex - b.orderIndex)
                                    .map((ingredient, index) => (
                                        <ConstructorIngredient key={index} ingredient={ingredient} />
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
                    type={canOrder ? 'primary' : 'disable'}
                    size="large"
                    htmlType="button"
                >
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
};

BurgerConstructor.propTypes = {};
