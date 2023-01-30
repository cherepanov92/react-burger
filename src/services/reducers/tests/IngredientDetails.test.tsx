import React from 'react';
import renderer from 'react-test-renderer';
import ingredientDetailsReducer, { InitialIngredientDetailsState as initialState } from '../IngredientDetails';
import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from '../../actions/IngredientDetails';
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

describe('IngredientDetailsReducer:', () => {
    it('Начальное состояние', () => {
        expect(ingredientDetailsReducer(initialState, {} as any)).toEqual(initialState);
        const tree = renderer.create(<>Начальное состояние</>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Добавление ингредиента в стор', () => {
        expect(
            ingredientDetailsReducer(initialState, {
                type: ADD_INGREDIENT_DETAILS,
                ingredient: ingredientItem
            })
        ).toEqual({
            ...ingredientItem
        });
    });

    it('Отчистка стора', () => {
        expect(
            ingredientDetailsReducer(initialState, {
                type: REMOVE_INGREDIENT_DETAILS
            })
        ).toEqual(null);
    });
});
