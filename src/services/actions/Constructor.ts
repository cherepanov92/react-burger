import { OrderedIngredient } from '../../utils/types';

export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT: 'REMOVE_INGREDIENT' = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT: 'MOVE_INGREDIENT' = 'MOVE_INGREDIENT';

interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    ingredient: OrderedIngredient;
}

interface IRemoveIngredient {
    readonly type: typeof REMOVE_INGREDIENT;
    ingredient: OrderedIngredient;
}

interface IMoveIngredient {
    readonly type: typeof MOVE_INGREDIENT;
    ingredient: OrderedIngredient;
    newIndex: number;
}

export type TIngredientActions = IAddIngredient | IRemoveIngredient | IMoveIngredient;