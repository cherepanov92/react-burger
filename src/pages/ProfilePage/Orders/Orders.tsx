import React, { FC, useEffect } from 'react';
import { OrderList } from '../../../components/Feed';
import styles from './Ordres.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../services/reducers/Root';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../../services/actions/WebSocket';
import { IngredientType, OrderType } from '../../../utils/types';
import { WSS_USER_ORDERS_URL } from '../../../utils/constants';
import OrderItem from '../../../components/OrderListItem/OrderItem/OrderItem';
import {getClearAccessToken} from "../../../utils/helpers";

const Orders: FC<{ orderData: OrderType[]; ingredients: IngredientType[] }> = ({ orderData, ingredients }) => {
    return (
        <section className={classNames(styles.orderList, 'mt-15')}>
            <OrderList orderData={orderData} ingredients={ingredients} />
        </section>
    );
};

const OrdersContainer: FC<{ isSinglePage?: boolean }> = ({ isSinglePage }) => {
    const dispatch = useAppDispatch();
    const { orderData, ingredients, stateAccessToken } = useAppSelector(state => ({
        orderData: state.orderList.data?.reverse(),
        ingredients: state.ingredients.ingredients,
        stateAccessToken: state.user?.accessToken?.split('Bearer ')[1]
    }));

    let accessToken: string|undefined = '';

    accessToken = getClearAccessToken();

    if (!accessToken) {
        accessToken = stateAccessToken
    }


    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: { url: `${WSS_USER_ORDERS_URL}${accessToken}` }
        });

        return () => {
            dispatch({
                type: WS_CONNECTION_CLOSED
            });
        };
    }, [accessToken, dispatch]);

    if (!!orderData?.length && !!ingredients?.length) {
        return isSinglePage ? <OrderItem /> : <Orders orderData={orderData} ingredients={ingredients} />;
    }

    return null;
};

export default OrdersContainer;
