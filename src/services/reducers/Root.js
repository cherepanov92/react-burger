import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({})

let composeEnhancers = compose;

if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const init = (initialState = {}) => createStore(rootReducer, initialState, enhancer);

export default init;
