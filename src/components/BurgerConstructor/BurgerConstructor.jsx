import React from 'react';
import styles from './BurgerConstructor.module.css';
import classNames from "classnames";
import {Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataTypes } from "../../utils/data";

export const BurgerConstructor = ({ingredients}) => {
    const startIndex = 0;
    const endIndex = ingredients.length -1;

    return (
        <section className={styles.wrapper}>
            <section className={classNames(styles.ingredientsBlock, "pt-25")}>
                <div className={'mr-4'}>
                    <ConstructorElement
                        type={'top'}
                        isLocked={true}
                        text={ingredients[startIndex].name}
                        price={ingredients[startIndex].price}
                        thumbnail={ingredients[startIndex].image}
                    />
                </div>
                <div className={styles.selectedBlock}>
                    {ingredients.slice([startIndex+1], [endIndex-1]).map(item => (
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
                        text={ingredients[endIndex].name}
                        price={ingredients[endIndex].price}
                        thumbnail={ingredients[endIndex].image}
                    />
                </div>
            </section>
            <section className={classNames(styles.priceBlock, "mt-10 mr-4 mb-10")}>
                <div className={"mr-10"}>
                    <span className="text text_type_digits-medium mr-2">610</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
};

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(dataTypes.isRequired).isRequired
};