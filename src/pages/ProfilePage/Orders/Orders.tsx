import React, { FC, useEffect } from 'react';
import { OrderList } from '../../../components/Feed';
import styles from './Ordres.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../services/reducers/Root';
import { WS_CLOSE_CONNECTION, WS_CONNECTION_START } from '../../../services/actions/WebSocket';
import { IngredientType, OrderType } from '../../../utils/types';
import { WSS_USER_ORDERS_URL } from '../../../utils/constants';
import OrderItem from '../../../components/OrderListItem/OrderItem/OrderItem';

const Orders: FC<{ orderData: OrderType[]; ingredients: IngredientType[] }> = ({ orderData, ingredients }) => {
    return (
        <section className={classNames(styles.orderList, 'mt-15')}>
            <OrderList orderData={orderData} ingredients={ingredients} />
        </section>
    );
};

const OrdersContainer: FC<{ isSinglePage?: boolean }> = ({ isSinglePage }) => {
    const dispatch = useAppDispatch();
    const { orderData, ingredients } = useAppSelector(state => ({
        orderData: state.orderList.data,
        ingredients: state.ingredients.ingredients
    }));

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: { url: WSS_USER_ORDERS_URL }
        });

        return () => {
            dispatch({
                type: WS_CLOSE_CONNECTION
            });
        };
    }, [dispatch]);

    if (!!orderData.length && !!ingredients.length) {
        return isSinglePage ? <OrderItem /> : <Orders orderData={orderData} ingredients={ingredients} />;
    }

    return null;
};

export default OrdersContainer;
