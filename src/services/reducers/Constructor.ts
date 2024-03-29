import { ADD_INGREDIENT, MOVE_INGREDIENT, REMOVE_INGREDIENT, TIngredientActions } from '../actions/Constructor';
import { EnumIngredientType, OrderedIngredient } from '../../utils/types';

type TConstructorState = {
    bun: OrderedIngredient | null;
    ingredients: OrderedIngredient[];
    totalPrice: number;
};

export const InitialConstructorState: TConstructorState = {
    bun: null,
    ingredients: [],
    totalPrice: 0
};

export default function constructorReducer(
    state: TConstructorState = InitialConstructorState,
    action: TIngredientActions
) {
    const getIngredientWithOrderHash = (ingredient: OrderedIngredient) => ({
        ...ingredient,
        orderId: ingredient.orderId ? ingredient.orderId : Math.floor(Math.random() * 10000000)
    });

    switch (action.type) {
        case ADD_INGREDIENT:
            if (action.ingredient.type === EnumIngredientType.BUN) {
                const totalPriceWithoutBun = state.bun ? state.totalPrice - state.bun.price * 2 : state.totalPrice;

                return {
                    ...state,
                    bun: action.ingredient,
                    totalPrice: totalPriceWithoutBun + action.ingredient.price * 2
                };
            }

            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    { ...getIngredientWithOrderHash(action.ingredient), orderIndex: state.ingredients.length }
                ],
                totalPrice: state.totalPrice + action.ingredient.price
            };
        case REMOVE_INGREDIENT:
            if (!state.ingredients.length) {
                return state;
            }

            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(ingredient => ingredient.orderId !== action.ingredient.orderId)
                ],
                totalPrice: state.totalPrice - action.ingredient.price
            };
        case MOVE_INGREDIENT:
            if (state.ingredients[action.newIndex].orderId === action.ingredient?.orderId) {
                return state;
            }

            const OrderListWithoutMovedItem = [...state.ingredients].filter(
                item => item.orderId !== action.ingredient?.orderId
            );

            const newIngredientsOrderList = [
                ...OrderListWithoutMovedItem.slice(0, action.newIndex),
                getIngredientWithOrderHash(action.ingredient),
                ...OrderListWithoutMovedItem.slice(action.newIndex, state.ingredients.length + 1)
            ];

            return {
                ...state,
                ingredients: newIngredientsOrderList.map((item, index) => ({ ...item, orderIndex: index }))
            };

        default:
            return state;
    }
}
