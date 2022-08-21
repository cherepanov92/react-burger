import React, { useContext } from 'react';
import classNames from "classnames";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from './BurgerConstructor.module.css';
import { BurgerContext } from "../../context/BurgerContextProvider";
import { getOrderIngredients } from "../../utils/getIngredientsGroups";
import { sendOrder } from "../../utils/api";
import {OrderDetails} from "./OrderDetails";

export const BurgerConstructor = () => {
    const { orderIngredients, setOrderData, setModalComponent } = useContext(BurgerContext);
    const basicBun = orderIngredients.bun[0];
    const totalPrice = orderIngredients.totalPrice;

    const sendOrderAction = () => {
        sendOrder(getOrderIngredients(orderIngredients))
            .then(respData => setOrderData({ name:respData?.name, number:respData?.order.number }))
            .then(() => setModalComponent(<OrderDetails />))
    }

    return (
        <section className={styles.wrapper}>
            <section className={classNames(styles.ingredientsBlock, "pt-25")}>
                {totalPrice ? (
                    <>
                        {basicBun && <div className={'mr-4'}>
                            <ConstructorElement
                                type={'top'}
                                isLocked={true}
                                text={`${basicBun.name} (верх)`}
                                price={basicBun.price}
                                thumbnail={basicBun.image}
                            />
                        </div>}
                        <div className={styles.selectedBlock}>
                            {[...orderIngredients.sauce, ...orderIngredients.main].map(item => (
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
                        { basicBun && <div className={'mr-4'}>
                            <ConstructorElement
                                type={'bottom'}
                                isLocked={true}
                                text={`${basicBun.name} (низ)`}
                                price={basicBun.price}
                                thumbnail={basicBun.image}
                            />
                        </div>}
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
                    onClick={ sendOrderAction }
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
