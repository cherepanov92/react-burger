import { ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT } from "../actions/Constructor";

export default function ConstructorReducer(state = {}, action) {

    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.ingredient.type === 'bun') {
                const totalPriceWithoutBun = state.bun ? state.totalPrice - (state.bun.price * 2) : state.totalPrice;

                return {
                    ...state,
                    bun: action.ingredient,
                    totalPrice: totalPriceWithoutBun + (action.ingredient.price * 2)
                }
            }
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
            return state
    }
}
