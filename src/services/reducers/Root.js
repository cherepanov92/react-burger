import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import ingredients from './Ingredients';
import constructor from './Constructor';
import ingredientDetails from './IngredientDetails';
import order from './Order';
import modal from './Modal';
import user from './User';

const BASIC_BUN = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '60d3b41abdacab0026a733c6'
};

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
            ingredients: {
                bun: [],
                main: [],
                sauce: []
            }
        },
        constructor: {
            bun: BASIC_BUN,
            ingredients: [],
            totalPrice: BASIC_BUN.price * 2
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
            name: null,
            email: null,
            password: null,
            accessToken: null,
            refreshToken: null,

        }
    }
) => createStore(rootReducer, initialState, enhancer);

export default init;
