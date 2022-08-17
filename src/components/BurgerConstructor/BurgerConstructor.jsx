import React from 'react';
import classNames from "classnames";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from './BurgerConstructor.module.css';
import { OrderDetails } from "./OrderDetails";
import { ingredientType } from "../../utils/types";
import { getIngredientsGroups } from "../../utils/getIngredientsGroups";

export const BurgerConstructor = ({ ingredients, attachModal, onClose }) => {
    const { bun, main, sauce } = getIngredientsGroups(ingredients)
    const basicBun = bun[0];

    return (
        <section className={styles.wrapper}>
            <section className={classNames(styles.ingredientsBlock, "pt-25")}>
                <div className={'mr-4'}>
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={`${basicBun.name} (верх)`}
                        price={basicBun.price}
                        thumbnail={basicBun.image}
                    />
                </div>
                <div className={styles.selectedBlock}>
                    {[...sauce, ...main].map(item => (
                        <div key={item._id} className={classNames(styles.ingredient, 'mr-2')}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </div>
                <div className={'mr-4'}>
                    <ConstructorElement
                        type={'bottom'}
                        isLocked={true}
                        text={`${basicBun.name} (низ)`}
                        price={basicBun.price}
                        thumbnail={basicBun.image}
                    />
                </div>
            </section>
            <section className={classNames(styles.priceBlock, "mt-10 mr-4 mb-10")}>
                <div className={"mr-10"}>
                    <span className="text text_type_digits-medium mr-2">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button onClick={() => attachModal(<OrderDetails onClose={onClose} />)} type="primary" size="large">
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
    attachModal: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};