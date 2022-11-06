import { getUserApiData, login, logout } from '../../utils/api';
import { APPEND_ERROR_MODAL_TYPE } from './Modal';
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT_USER } from '../reducers/User';
import { deleteCookie } from '../../utils/helpers';

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
                        data: res.user,
                        accessToken: res.accessToken
                    });
                } else {
                    dispatch({
                        type: GET_USER_FAILED
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

export const logoutUser = () => {
    return function (dispatch) {
        logout()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGOUT_USER
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

export const getUserData = () => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST
        });
        getUserApiData().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_USER_SUCCESS,
                    data: res.user
                });
            } else {
                dispatch({
                    type: GET_USER_FAILED
                });
            }
        });
    };
};
