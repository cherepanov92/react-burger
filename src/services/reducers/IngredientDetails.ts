import {
    ADD_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS,
    TIngredientDetailsActions
} from '../actions/IngredientDetails';
import { IngredientType } from '../../utils/types';

type TIngredientDetailsState = null | IngredientType;

export const InitialIngredientDetailsState: TIngredientDetailsState = null;

export default function ingredientDetailsReducer(
    state = InitialIngredientDetailsState,
    action: TIngredientDetailsActions
) {
    switch (action.type) {
        case ADD_INGREDIENT_DETAILS:
            return { ...action.ingredient };
        case REMOVE_INGREDIENT_DETAILS:
            return null;
        default:
            return state;
    }
}
