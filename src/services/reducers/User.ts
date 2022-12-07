import { deleteCookie } from '../../utils/helpers';
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT_USER } from '../actions/User';

type UserState = {
    data?: any;
    accessToken?: string;
};

export default function userReducer(state: UserState = {}, action: any) {
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
