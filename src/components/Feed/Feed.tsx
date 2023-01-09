import React, { FC } from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import classNames from 'classnames';
import OrderListItem from '../OrderListItem/OrderListItem';
import { IngredientType, OrderType } from '../../utils/types';
import { diffDates } from '../../utils/helpers';

const OrderTable: FC<{ orderData: OrderType[] }> = ({ orderData }) => {
    const doneOrders = orderData.filter(order => order.status === 'done');
    const pendingOrders = orderData.filter(order => order.status === 'pending');

    return (
        <>
            <div className={styles.numbers}>
                <div className={styles.numbers_block}>
                    <p className="text text_type_main-medium mb-6">Готовы</p>
                    <div className={styles.numbers_blue}>
                        {doneOrders.map((order, i) => {
                            return i < 10 ? (
                                <p key={order._id} className="text text_type_digits-default mb-2">
                                    #{order.number}
                                </p>
                            ) : null;
                        })}
                    </div>
                </div>
                {!!pendingOrders.length && (
                    <div className={styles.numbers_block}>
                        <p className="text text_type_main-medium mb-6">В работе</p>
                        <div>
                            {pendingOrders.map(order => {
                                return (
                                    <p key={order._id} className="text text_type_digits-default mb-2">
                                        #{order.number}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div className={'mt-15'}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={styles.result_text + ' text text_type_digits-large'}>{orderData.sort()[0]?.number}</p>
            </div>
            <div className={'mt-15'}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={styles.result_text + ' text text_type_digits-large'}>
                    {orderData.filter(order => diffDates(new Date(order.createdAt)) < 1).length}
                </p>
            </div>
        </>
    );
};

const getOrderIngredients = (ingredients: IngredientType[], ingredientsID: string[]) => {
    return ingredients.filter(ingredient => ingredientsID.includes(ingredient._id));
};

export const OrderList: FC<{ orderData: OrderType[]; ingredients: IngredientType[] }> = ({
    orderData,
    ingredients
}) => {
    if (!orderData.length) {
        return null;
    }

    return (
        <>
            {orderData.map((orderItemData, i) => (
                <OrderListItem
                    key={`${orderItemData._id}${i}`}
                    orderData={orderItemData}
                    orderIngredients={getOrderIngredients(ingredients, orderItemData.ingredients)}
                />
            ))}
        </>
    );
};

const Feed: FC<{ orderData: OrderType[]; ingredients: IngredientType[] }> = ({ orderData, ingredients }) => {
    return (
        <div className={classNames(styles.container, 'pl-4 pr-4 mt-10')}>
            <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
            <div className={styles.wrapper}>
                <div className={classNames(styles.orderList, 'pr-2')}>
                    <OrderList orderData={orderData} ingredients={ingredients} />
                </div>
                <div className={styles.orderTable}>
                    <OrderTable orderData={orderData} />
                </div>
            </div>
        </div>
    );
};

export default Feed;
