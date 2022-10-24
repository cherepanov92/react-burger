import { login } from '../../utils/api';
import { APPEND_ERROR_MODAL_TYPE } from './Modal';
import { GET_LOGIN_FAILED, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS } from '../reducers/User';

export const loginUser = (email, password) => {
    return function (dispatch) {
        dispatch({
            type: GET_LOGIN_REQUEST
        });
        login(email, password)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_LOGIN_SUCCESS,
                        name: res.user.name,
                        email: res.user.email
                    });
                } else {
                    dispatch({
                        type: GET_LOGIN_FAILED
                    });
                }
            })
            .catch(err =>
                dispatch({
                    type: APPEND_ERROR_MODAL_TYPE,
                    code: err.code
                })
            );
    };
};
