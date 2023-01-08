import React, { FC, useEffect } from 'react';

import Feed from '../../components/Feed/Feed';
import { WS_CLOSE_CONNECTION, WS_CONNECTION_START } from '../../services/actions/WebSocket';
import { useAppDispatch, useAppSelector } from '../../services/reducers/Root';
import { WSS_ALL_ORDERS_URL } from '../../utils/constants';

const FeedPage: FC = () => {
    const dispatch = useAppDispatch();
    const { orderData, ingredients } = useAppSelector(state => ({
        orderData: state.orderList.data,
        ingredients: state.ingredients.ingredients
    }));

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: { url: WSS_ALL_ORDERS_URL }
        });

        return () => {
            dispatch({
                type: WS_CLOSE_CONNECTION
            });
        };
    }, [dispatch]);

    if (!!orderData.length && !!ingredients.length) {
        return <Feed orderData={orderData} ingredients={ingredients} />;
    }

    return null;
};

export default FeedPage;