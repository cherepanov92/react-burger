import React from 'react';
import renderer from 'react-test-renderer';

import orderListReducer, {initialState} from '../OrderList';
import {WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE} from "../../actions/WebSocket";
import {OrderType} from "../../../utils/types";

const OrderItem: OrderType = {
    _id: "superLongHash",
    createdAt: "720057300",
    updatedAt: "720057400",
    status: 'pending',
    name: 'superBurger',
    number: 1337,
    ingredients: ['super', 'burger', 'salt']
}

describe('OrderListReducer:', () => {
    it('Начальное состояние', () => {
        expect(orderListReducer(initialState, {} as any)).toEqual(initialState);
        const tree = renderer.create(<>Начальное состояние</>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('WS: запрос на подключение', () => {
        expect(
            orderListReducer(initialState, {
                type: WS_CONNECTION_START
            })
        ).toEqual({
            ...initialState,
            ordersRequest: true
        });
    });

    it('WS: подключение установлено', () => {
        expect(
            orderListReducer(initialState, {
                type: WS_CONNECTION_SUCCESS
            })
        ).toEqual({
            ...initialState,
            ordersRequest: false,
            ordersFailed: false,
        });
    });

    it('WS: ошибка', () => {
        expect(
            orderListReducer(initialState, {
                type: WS_CONNECTION_ERROR
            })
        ).toEqual({
            ...initialState,
            ordersFailed: true,
            ordersRequest: false
        });
    });

    it('WS: сообщение', () => {
        expect(
            orderListReducer(initialState, {
                type: WS_GET_MESSAGE,
                payload: [OrderItem]
            })
        ).toEqual({
            ...initialState,
            ordersFailed: false,
            data: [OrderItem]
        });
    });
});
