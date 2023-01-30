import React from 'react';
import renderer from 'react-test-renderer';
import constructorReducer, { InitialConstructorState as initialState } from '../Constructor';
import {ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT} from '../../actions/Constructor';
import { EnumIngredientType, OrderedIngredient } from '../../../utils/types';
import { getIngredientWithOrderHash } from '../../../utils/helpers';
import { v4 as uuid } from 'uuid';

const getIngredientItem = (
    type: EnumIngredientType = EnumIngredientType.BUN,
    orderIndex: number = 1
): OrderedIngredient => ({
    _id: '60d3b41abdacab0026a733c6',
    name: 'noName ingredient',
    type: type,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 333,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    orderIndex: orderIndex,
    orderId: uuid(),
    index: 123123
});

const basicBun = getIngredientItem();
const basicSauce = getIngredientItem(EnumIngredientType.SAUCE);
const firstItem = getIngredientItem(EnumIngredientType.SAUCE, 0);
const secondItem = getIngredientItem(EnumIngredientType.MAIN, 1);

const basicOrder = {
    bun: basicBun,
    ingredients: [firstItem, secondItem],
    totalPrice: 1332
};

describe('ConstructorReducer:', () => {
    it('Начальное состояние', () => {
        expect(constructorReducer(initialState, {} as any )).toEqual(initialState);
        const tree = renderer.create(<>Начальное состояние</>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Добавление соуса или добавки в закакз', () => {
        expect(
            constructorReducer(initialState, {
                type: ADD_INGREDIENT,
                ingredient: basicSauce
            })
        ).toEqual({
            ...initialState,
            ingredients: [{ ...getIngredientWithOrderHash(basicSauce), orderIndex: initialState.ingredients.length }],
            totalPrice: initialState.totalPrice + basicSauce.price
        });
    });

    it('Добавление булки в закакз', () => {
        expect(
            constructorReducer(initialState, {
                type: ADD_INGREDIENT,
                ingredient: basicBun
            })
        ).toEqual({
            ...initialState,
            bun: basicBun,
            totalPrice: initialState.totalPrice + basicBun.price * 2
        });
    });

    it('Удаление соуса или добавки из закакза', () => {
        expect(
            constructorReducer(basicOrder, {
                type: REMOVE_INGREDIENT,
                ingredient: firstItem
            })
        ).toEqual({
            ...basicOrder,
            ingredients: [secondItem],
            totalPrice: basicOrder.totalPrice - firstItem.price
        });
    });

    it('Перемещение соуса или добавки в закакзе', () => {
        expect(
            constructorReducer(basicOrder, {
                type: MOVE_INGREDIENT,
                ingredient: firstItem,
                newIndex: 1
            })
        ).toEqual({
            ...basicOrder,
            ingredients: [
                {...secondItem, orderIndex:0},
                {...firstItem, orderIndex:1}
            ],
            totalPrice: basicOrder.totalPrice
        });
    });
});
