import {
    TWSActions,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from '../actions/WebSocket';

type TOrderListState = {
    ordersRequest: boolean;
    ordersFailed: boolean;
    //todo: типизировать когда будет понятно
    data: any;
};

const initialState: TOrderListState = {
    ordersRequest: false,
    ordersFailed: false,
    data: null
};

const orderListReducer = (state: TOrderListState = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return {
                ...state,
                ordersRequest: true
            };
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                ordersRequest: false,
                ordersFailed: false,
                data: action.payload
            };
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                ordersFailed: true,
                ordersRequest: false
            };
        }
        case WS_GET_MESSAGE: {
            return {
                ...state,
                ordersFailed: false,
                data: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default orderListReducer;