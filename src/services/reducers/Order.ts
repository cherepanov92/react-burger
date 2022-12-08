import { SENT_ORDER_FAILED, SENT_ORDER_REQUEST, SENT_ORDER_SUCCESS, TOrderActions } from '../actions/Order';

type OrderState = {
    orderRequest?: boolean;
    orderFailed?: boolean;
    orderData?: {
        name: string;
        number: number;
    };
};

export default function orderReducer(state: OrderState = {}, action: TOrderActions) {
    switch (action.type) {
        case SENT_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
                orderFailed: false,
                orderData: { name: null, number: null }
            };
        }
        case SENT_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderData: { name: action.name, number: action.number }
            };
        }
        case SENT_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                orderData: { name: null, number: null }
            };
        }
        default: {
            return state;
        }
    }
}
