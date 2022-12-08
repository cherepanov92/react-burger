import {
    ADD_INGREDIENT_DETAILS,
    REMOVE_INGREDIENT_DETAILS,
    TIngredientDetailsActions
} from '../actions/IngredientDetails';

export default function ingredientDetailsReducer(state = null, action: TIngredientDetailsActions) {
    switch (action.type) {
        case ADD_INGREDIENT_DETAILS:
            return { ...action.ingredient };
        case REMOVE_INGREDIENT_DETAILS:
            return null;
        default:
            return state;
    }
}
