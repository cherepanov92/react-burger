import { sendOrder } from '../../utils/api';
import { APPEND_ERROR_MODAL_TYPE, APPEND_MODAL_TYPE, IAppendModalType } from './Modal';
import { EnumModalType, IError, OrderedIngredient } from '../../utils/types';
import { Dispatch } from 'react';

export const SENT_ORDER_REQUEST: 'SENT_ORDER_REQUEST' = 'SENT_ORDER_REQUEST';
export const SENT_ORDER_SUCCESS: 'SENT_ORDER_SUCCESS' = 'SENT_ORDER_SUCCESS';
export const SENT_ORDER_FAILED: 'SENT_ORDER_FAILED' = 'SENT_ORDER_FAILED';

interface ISendOrderRequest {
    readonly type: typeof SENT_ORDER_REQUEST;
}

interface ISendOrderSuccess {
    readonly type: typeof SENT_ORDER_SUCCESS;
    name: string;
    number: number;
}

interface ISendOrderFailed {
    readonly type: typeof SENT_ORDER_FAILED;
}

export type TOrderActions = ISendOrderRequest | ISendOrderSuccess | ISendOrderFailed;

export const sendOrderRequest = (orderList: OrderedIngredient[]) => {
    return function (dispatch: Dispatch<TOrderActions | IAppendModalType | IError>) {
        dispatch({
            type: SENT_ORDER_REQUEST
        });
        sendOrder(orderList)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: SENT_ORDER_SUCCESS,
                        name: res.name,
                        number: res.order.number
                    });
                    dispatch({ type: APPEND_MODAL_TYPE, modalType: EnumModalType.ORDER });
                } else {
                    dispatch({
                        type: SENT_ORDER_FAILED
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: APPEND_ERROR_MODAL_TYPE,
                    message: err.message
                });
            });
    };
};
