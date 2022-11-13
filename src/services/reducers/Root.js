import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import ingredients from './Ingredients';
import constructor from './Constructor';
import ingredientDetails from './IngredientDetails';
import order from './Order';
import modal from './Modal';
import user from './User';

let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const rootReducer = combineReducers({
    ingredients,
    constructor,
    ingredientDetails,
    order,
    modal,
    user
});

const init = (
    initialState = {
        ingredients: {
            ingredientsRequest: false,
            ingredientsFailed: false,
            ingredients: []
        },
        constructor: {
            bun: null,
            ingredients: [],
            totalPrice: 0
        },
        ingredientDetails: null,
        order: {
            orderRequest: false,
            orderFailed: false,
            orderData: {
                name: null,
                number: null
            }
        },
        modal: {
            modalType: null,
            status: null,
            message: null
        },
        user: {
            data: null,
            accessToken: null
        }
    }
) => createStore(rootReducer, initialState, enhancer);

export default init;
