import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../actions/Ingredients";
import { getIngredientsGroups } from "../../utils/getIngredientsGroups";

const initialState = {
    ingredientsRequest: false,
    ingredientsFailed: false,
    ingredients: { bun: [], main: [], sauce: [] }
}

const IngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
                ingredientsFailed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: getIngredientsGroups(action.items),
                ingredientsRequest: false,

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
            return state
        }
    }
}

export default IngredientsReducer;

