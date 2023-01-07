import React, { FC } from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderListItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { EnumOrderStatusName, IngredientType, OrderType } from '../../utils/types';
import classNames from 'classnames';
import { calculateOrderCost, dateParse, getOrderIngredients } from '../../utils/helpers';

const OrderListItem: FC<{ orderData: OrderType; orderIngredients: IngredientType[] }> = ({
    orderData,
    orderIngredients
}) => {
    const history = useHistory();
    const { path } = useRouteMatch();
    const isModalMode = useRouteMatch('/feed');

    const ingredientList = getOrderIngredients(orderIngredients);

    const OpenOrderItemHandler = () => {
        history.replace(`${path}/${orderData._id}`, { isModal: isModalMode });
    };

    return (
        <section className={classNames(styles.item, 'pt-6 pr-6 pb-6 pl-6 mb-4')} onClick={OpenOrderItemHandler}>
            <div className={classNames(styles.top, 'mb-6')}>
                <p className="text text_type_digits-default">#{orderData.number}</p>
                <p className="text text_type_main-default text_color_inactive">{dateParse(orderData.createdAt)}</p>
            </div>
            <p className="text text_type_main-medium mb-2">{orderData.name}</p>
            <p className="text text_type_main-default mb-6">{EnumOrderStatusName[orderData.status]}</p>
            <div className={styles.bottom}>
                <div className={styles.params}>
                    {orderData.ingredients
                        .map((orderIngredient, i) => (
                            <>
                                {i < 5 ? (
                                    <div className={styles.param} key={i}>
                                        <img
                                            className={styles.paramImg}
                                            src={ingredientList[orderIngredient].image_mobile}
                                            alt={`Добавка: ${ingredientList[orderIngredient].name}`}
                                        />
                                    </div>
                                ) : i === 5 ? (
                                    <div
                                        className={classNames(
                                            styles.param,
                                            'text text_type_main-default text_color_inactive'
                                        )}
                                        key={i}
                                    >
                                        {orderData.ingredients.length > 6 ? (
                                            <>
                                                <img
                                                    className={classNames(styles.paramImg, styles.lastParamImg)}
                                                    src={ingredientList[orderIngredient].image_mobile}
                                                    alt={`Добавка: ${ingredientList[orderIngredient].name}`}
                                                />
                                                <span
                                                    className={classNames(
                                                        styles.paramAdditionalValue,
                                                        'text text_type_main-default'
                                                    )}
                                                >
                                                    +{orderData.ingredients.length - 6}
                                                </span>
                                            </>
                                        ) : (
                                            <img
                                                className={styles.paramImg}
                                                src={ingredientList[orderIngredient].image_mobile}
                                                alt={`Добавка: ${ingredientList[orderIngredient].name}`}
                                            />
                                        )}
                                    </div>
                                ) : null}
                            </>
                        ))
                        .reverse()}
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">{calculateOrderCost(orderIngredients)}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </section>
    );
};

export default OrderListItem;
