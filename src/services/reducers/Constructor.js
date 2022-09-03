import { ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT } from "../actions/Constructor";
import { orderIngredientsInitState } from "../../utils/mock";

const initialState = {
    bun: null,
    ingredients: [],
    totalPrice: 0
};

// todo: убрать мок с initState на шаге с dnd
const ConstructorReducer = (state = orderIngredientsInitState, action) => {

    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient],
                totalPrice: state.totalPrice + action.ingredient.price
            }
        case REMOVE_INGREDIENT:
            if (!state.ingredients.length) {
                return state;
            }

            return {
                ...state,
                ingredients: [...state.ingredients.filter(ingredient => ingredient._id !== action.ingredient._id)],
                totalPrice: state.totalPrice - action.ingredient.price
            }
        case MOVE_INGREDIENT:
            // todo: обмозговать при работе с dnd
            return {...state}
        default:
            // todo: убрать мок с initState на шаге с dnd
            return {...orderIngredientsInitState}
    }
}

export default ConstructorReducer;