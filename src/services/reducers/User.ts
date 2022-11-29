import { deleteCookie } from '../../utils/helpers';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const LOGOUT_USER = 'LOGOUT_USER';

type userState = {
    data?: any;
    accessToken?: string;
};

export default function userReducer(state: userState = {}, action: any) {
    switch (action.type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true,
                userFailed: false
            };
        }
        case GET_USER_SUCCESS: {
            const newState = {
                ...state,
                data: action.data,
                userRequest: false,
                accessToken: state.accessToken
            };

            if (action.accessToken) {
                newState.accessToken = action.accessToken;
            }

            return newState;
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                userFailed: true,
                userRequest: false
            };
        }
        case LOGOUT_USER: {
            deleteCookie('refreshToken');
            deleteCookie('accessToken');
            return { ...state, data: null, accessToken: null };
        }
        default: {
            return state;
        }
    }
};
