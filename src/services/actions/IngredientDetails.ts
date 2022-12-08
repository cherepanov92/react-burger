import { IngredientType } from '../../utils/types';

export const ADD_INGREDIENT_DETAILS: 'ADD_INGREDIENT_DETAILS' = 'ADD_INGREDIENT_DETAILS';
export const REMOVE_INGREDIENT_DETAILS: 'REMOVE_INGREDIENT_DETAILS' = 'REMOVE_INGREDIENT_DETAILS';

interface IAddIngredientDetails {
    readonly type: typeof ADD_INGREDIENT_DETAILS;
    ingredient: IngredientType;
}

interface IRemoveIngredientDetails {
    readonly type: typeof REMOVE_INGREDIENT_DETAILS;
}

export type TIngredientDetailsActions = IAddIngredientDetails | IRemoveIngredientDetails;