import { SENT_ORDER_FAILED, SENT_ORDER_REQUEST, SENT_ORDER_SUCCESS } from "../actions/Order";

export default function OrderReducer(state = {}, action) {
    switch (action.type) {
        case SENT_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                orderData: { ...state.order, name: null, number: null }
            };
        }
        case SENT_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderData: { ...state.order, name: action.name, number: action.number }
            };
        }
        case SENT_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                orderData: { ...state.order, name: null, number: null }
            };
        }
        default: {
            return state
        }
    }
}