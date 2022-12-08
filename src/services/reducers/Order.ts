import { SENT_ORDER_FAILED, SENT_ORDER_REQUEST, SENT_ORDER_SUCCESS, TOrderActions } from '../actions/Order';

type TOrderState = {
    orderRequest: boolean;
    orderFailed: boolean;
    orderData: {
        name: string | null;
        number: number | null;
    };
};

export const InitialOrderState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    orderData: {
        name: null,
        number: null
    }
};

export default function orderReducer(state: TOrderState = InitialOrderState, action: TOrderActions) {
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
