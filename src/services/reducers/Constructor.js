import { ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT } from "../actions/Constructor";

export default function ConstructorReducer(state = {}, action) {

    switch (action.type) {
        case ADD_INGREDIENT:
            const ingredientWithOrderHash = {...action.ingredient, orderId: Math.floor(Math.random() * 10000000)};

            if (ingredientWithOrderHash.type === 'bun') {
                const totalPriceWithoutBun = state.bun ? state.totalPrice - (state.bun.price * 2) : state.totalPrice;

                return {
                    ...state,
                    bun: ingredientWithOrderHash,
                    totalPrice: totalPriceWithoutBun + (ingredientWithOrderHash.price * 2)
                }
            }

            return {
                ...state,
                ingredients: [...state.ingredients, ingredientWithOrderHash],
                totalPrice: state.totalPrice + ingredientWithOrderHash.price
            }
        case REMOVE_INGREDIENT:
            if (!state.ingredients.length) {
                return state;
            }

            return {
                ...state,
                ingredients: [...state.ingredients.filter(ingredient => ingredient.orderId !== action.ingredient.orderId)],
                totalPrice: state.totalPrice - action.ingredient.price
            }
        case MOVE_INGREDIENT:
            // todo: обмозговать при работе с dnd
            return {...state}
        default:
            return state
    }
}
