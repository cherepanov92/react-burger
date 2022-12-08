import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    TIngredientsActions
} from '../actions/Ingredients';
import { IngredientType } from '../../utils/types';

export type TIngredientsState = {
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    ingredients: IngredientType[];
};

export const InitialIngredientsState: TIngredientsState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: []
};

export default function ingredientsReducer(
    state: TIngredientsState = InitialIngredientsState,
    action: TIngredientsActions
) {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.items,
                ingredientsRequest: false
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false
            };
        }
        default: {
            return state;
        }
    }
};
