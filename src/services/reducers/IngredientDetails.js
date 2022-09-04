import { ADD_INGREDIENT_DETAILS, REMOVE_INGREDIENT_DETAILS } from "../actions/IngredientDetails";


export default function IngredientDetailsReducer(state = null, action) {
    switch (action.type) {
        case ADD_INGREDIENT_DETAILS:
            return { ...action.ingredient};
        case REMOVE_INGREDIENT_DETAILS:
            return null;
        default:
            return state;
    }
}