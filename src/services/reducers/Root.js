import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

import ingredients from './Ingredients';
import constructor from './Constructor';
import ingredientDetails from './IngredientDetails';
import order from './Order';
import modal from './Modal';


const rootReducer = combineReducers({
    ingredients,
    constructor,
    ingredientDetails,
    order,
    modal
})

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const init = (initialState = {
    ingredients: {
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: {
            bun: [],
            main: [],
            sauce: []
        },
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
        errorStatus: null
    }
}) => createStore(rootReducer, initialState, enhancer);

export default init;
