import React from 'react';
import renderer from 'react-test-renderer';
import ingredientsReducer, { InitialIngredientsState as initialState } from '../Ingredients';
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from '../../actions/Ingredients';
import { EnumIngredientType, IngredientType } from '../../../utils/types';

const ingredientItem: IngredientType = {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: EnumIngredientType.BUN,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
};

describe('IngredientsReducer:', () => {
    it('Начальное состояние', () => {
        expect(ingredientsReducer(initialState, {} as any)).toEqual(initialState);
        const tree = renderer.create(<>Начальное состояние</>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Запрос на получение списка ингредиентов', () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_REQUEST
            })
        ).toEqual({
            ...initialState,
            ingredientsRequest: true,
            ingredientsFailed: false
        });
    });

    it('Список ингредиентов получен', () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS,
                items: [ingredientItem]
            })
        ).toEqual({
            ...initialState,
            ingredients: [ingredientItem],
            ingredientsRequest: false
        });
    });

    it('Ошибка при получении списка ингредиентов', () => {
        expect(
            ingredientsReducer(initialState, {
                type: GET_INGREDIENTS_FAILED
            })
        ).toEqual({
            ...initialState,
            ingredientsFailed: true,
            ingredientsRequest: false
        });
    });
});
