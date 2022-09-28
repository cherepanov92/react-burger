import React from 'react';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './BurgerConstructor.module.css';
import { ADD_INGREDIENT } from "../../services/actions/Constructor";
import { sendOrderRequest } from "../../services/actions/Order";
import { getOrderIngredients } from "../../utils/getIngredientsGroups";
import {ConstructorIngredient} from "./ConstructotIngredient/ConstructotIngredient";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { bun, ingredients, totalPrice } = useSelector(state => state.constructor);
    const hasBun = !!bun;

    const onSendOrderRequest = () => {
        dispatch(sendOrderRequest(getOrderIngredients([bun, ingredients])))
    }

    const onDropHandler = (ingredient) => {
        dispatch({ type: ADD_INGREDIENT, ingredient: ingredient })
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            onDropHandler(ingredient);
        }
    })

    return (
        <section className={styles.wrapper} ref={dropTarget}>
            <section className={classNames(styles.ingredientsBlock, "pt-25")}>
                {totalPrice ? (
                    <>
                        <div className={'mr-4'}>
                            {hasBun && <ConstructorElement
                                type={'top'}
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />}
                        </div>
                        {!!ingredients.length && <div className={styles.selectedBlock}>
                            {ingredients.map(ingredient => <ConstructorIngredient key={ingredient._id} ingredient={ingredient} />)}
                        </div>
                        }
                        <div className={'mr-4'}>
                            {hasBun && <ConstructorElement
                                type={'bottom'}
                                isLocked={true}
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />}
                        </div>
                    </>
                ) : (
                    <p>Пусто</p>
                )}
            </section>
            <section className={classNames(styles.priceBlock, "mt-10 mr-4 mb-10")}>
                <div className={"mr-10"}>
                    <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button
                    onClick={ onSendOrderRequest }
                    type={totalPrice ? "primary" : "disable"}
                    size="large"
                >
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
};

BurgerConstructor.propTypes = {};
