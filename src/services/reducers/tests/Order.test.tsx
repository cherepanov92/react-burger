import React from 'react';
import renderer from 'react-test-renderer';
import orderReducer, { InitialOrderState as initialState } from '../Order';
import { SENT_ORDER_FAILED, SENT_ORDER_REQUEST, SENT_ORDER_SUCCESS } from '../../actions/Order';

describe('OrderReducer:', () => {
    it('Начальное состояние', () => {
        expect(orderReducer(initialState, {} as any)).toEqual(initialState);
        const tree = renderer.create(<>Начальное состояние</>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Запрос на создание заказа', () => {
        expect(
            orderReducer(initialState, {
                type: SENT_ORDER_REQUEST
            })
        ).toEqual({
            ...initialState,
            orderRequest: true,
            orderFailed: false,
            orderData: { name: null, number: null }
        });
    });

    it('Подтверждение заказа', () => {
        expect(
            orderReducer(initialState, {
                type: SENT_ORDER_SUCCESS,
                name: 'super_order',
                number: 1337
            })
        ).toEqual({
            ...initialState,
            orderRequest: false,
            orderData: { name: 'super_order', number: 1337 }
        });
    });

    it('Ошибка отправки заказа', () => {
        expect(
            orderReducer(initialState, {
                type: SENT_ORDER_FAILED
            })
        ).toEqual({
            ...initialState,
            orderFailed: true,
            orderRequest: false,
            orderData: { name: null, number: null }
        });
    });
});
