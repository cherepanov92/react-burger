import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import ingredients, { InitialIngredientsState } from './Ingredients';
import constructor, { InitialConstructorState } from './Constructor';
import ingredientDetails, { InitialIngredientDetailsState } from './IngredientDetails';
import order, { InitialOrderState } from './Order';
import modal, { InitialModalState } from './Modal';
import user, { InitialUserState } from './User';
import orderList from './OrderList';
import thunkMiddleware from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { socketMiddleware } from '../middleware/socket';
import { wsActions } from '../actions/WebSocket';
import { AppThunk, TInitialState } from '../../utils/types';

export const rootReducer = combineReducers({
    ingredients,
    constructor,
    ingredientDetails,
    order,
    modal,
    user,
    orderList
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware(wsActions)));

const initialState: TInitialState = {
    ingredients: InitialIngredientsState,
    constructor: InitialConstructorState,
    ingredientDetails: InitialIngredientDetailsState,
    order: InitialOrderState,
    modal: InitialModalState,
    user: InitialUserState
};

export const store = createStore(rootReducer, initialState, enhancer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch | AppThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;