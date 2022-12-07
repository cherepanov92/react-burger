import { getUserApiData, login, logout, userRegister } from '../../utils/api';
import { APPEND_ERROR_MODAL_TYPE } from './Modal';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const LOGOUT_USER: 'LOGOUT_USER' = 'LOGOUT_USER';

export const loginUser = (email: string, password: string) => {
    return function (dispatch: any) {
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
    return function (dispatch: any) {
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
    return function (dispatch: any) {
        getUserApiData()
            .then(res => {
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
            })
            .catch(err => {
                if (err.message === 'You should be authorised') {
                    dispatch({
                        type: LOGOUT_USER
                    });
                }
            });
    };
};

export const registrationUser = (email: string, password: string, name: string) => {
    return function (dispatch: any) {
        userRegister(email, password, name)
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
