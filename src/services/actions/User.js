import { getUserApiData, login } from '../../utils/api';
import { APPEND_ERROR_MODAL_TYPE } from './Modal';
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS } from '../reducers/User';

export const loginUser = (email, password) => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        login(email, password)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        name: res.user.name,
                        email: res.user.email
                    });
                } else {
                    dispatch({
                        type: GET_USER_FAILED
                    });
                }
            })
            .catch(err =>
                dispatch({
                    type: APPEND_ERROR_MODAL_TYPE,
                    message: err.message
                })
            );
    };
};

export const getUserData = () => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        getUserApiData()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        name: res.user.name,
                        email: res.user.email
                    });
                } else {
                    dispatch({
                        type: GET_USER_FAILED
                    });
                }
            })
            .catch(err =>
                dispatch({
                    type: APPEND_ERROR_MODAL_TYPE,
                    message: err.message
                })
            );
    };
};
