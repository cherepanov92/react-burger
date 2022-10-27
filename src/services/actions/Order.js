import { sendOrder } from '../../utils/api';
import { APPEND_ERROR_MODAL_TYPE, APPEND_MODAL_TYPE } from './Modal';

export const SENT_ORDER_REQUEST = 'SENT_ORDER_REQUEST';
export const SENT_ORDER_SUCCESS = 'SENT_ORDER_SUCCESS';
export const SENT_ORDER_FAILED = 'SENT_ORDER_FAILED';

export const sendOrderRequest = orderList => {
    return function (dispatch) {
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
                    dispatch({ type: APPEND_MODAL_TYPE, modalType: 'order' });
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
