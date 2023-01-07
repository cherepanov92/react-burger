import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderItem.module.css';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useAppSelector } from '../../../services/reducers/Root';
import { EnumOrderStatusName, IIngredientList, OrderType } from '../../../utils/types';
import { calculateOrderCost, getOrderIngredients } from '../../../utils/helpers';
import { useParams } from 'react-router-dom';

const OrderItem: FC<{ orderItem: OrderType; ingredientList: IIngredientList; isModal: boolean }> = ({
    orderItem,
    ingredientList,
    isModal
}) => {
    const orderIngredientsSet = new Set(orderItem.ingredients);

    return (
        <div className={classNames(styles.wrapper, 'mb-10', { 'mt-10 ': !isModal })}>
            <p className="text text_type_digits-default mb-10">#{orderItem.number}</p>
            <p className="text text_type_main-medium mb-3">{orderItem.name}</p>
            <p className="text text_type_main-default mb-15">{EnumOrderStatusName[orderItem.status]}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={classNames(styles.ingredients, 'pr-6 mb-10')}>
                {[...orderIngredientsSet].map((ingredientID, i) => {
                    return (
                        <div key={i} className={classNames(styles.ingredient, 'mb-4')}>
                            <div className={styles.title}>
                                <div className={classNames(styles.icon, 'mr-4')}>
                                    <img
                                        className={styles.iconImg}
                                        src={ingredientList[ingredientID].image_mobile}
                                        alt={`Добавка: ${ingredientList[ingredientID].name}`}
                                    />
                                </div>
                                <p className="text text_type_main-default">{ingredientList[ingredientID].name}</p>
                            </div>
                            <div className={styles.price}>
                                <p className="text text_type_digits-default mr-2">
                                    {orderItem.ingredients.filter(ingredient => ingredient === ingredientID).length} x{' '}
                                    {ingredientList[ingredientID].price}
                                </p>{' '}
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">
                        {calculateOrderCost(orderItem.ingredients.map(ingredient => ingredientList[ingredient]))}
                    </p>{' '}
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

const OrderItemContainer: FC<{ isModal?: boolean }> = ({ isModal }) => {
    const { orderData, ingredients } = useAppSelector(state => ({
        orderData: state.orderList.data,
        ingredients: state.ingredients.ingredients
    }));
    const urlParams = useParams<{ id: string }>();
    const selectedOrderId = urlParams.id;

    if (!orderData.length || !ingredients.length) {
        return null;
    }

    const ingredientList = getOrderIngredients(ingredients);
    const selectedOrderData = orderData.find(order => order._id === selectedOrderId) as OrderType;

    return <OrderItem orderItem={selectedOrderData} ingredientList={ingredientList} isModal={!!isModal} />;
};

export default OrderItemContainer;
