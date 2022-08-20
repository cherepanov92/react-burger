import React, { useContext } from 'react';
import classNames from "classnames";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

import styles from './BurgerConstructor.module.css';
import { OrderDetails } from "./OrderDetails";
import { BurgerContext } from "../../context/BurgerContextProvider";

export const BurgerConstructor = ({ attachModal, onClose }) => {
    const { orderIngredients } = useContext(BurgerContext);
    const basicBun = orderIngredients.bun[0];
    const totalPrice = orderIngredients.totalPrice

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
                    onClick={() => attachModal(<OrderDetails onClose={onClose} />)}
                    type={totalPrice ? "primary" : "disable"}
                    size="large"
                >
                    Оформить заказ
                </Button>
            </section>
        </section>
    );
};

BurgerConstructor.propTypes = {
    attachModal: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};