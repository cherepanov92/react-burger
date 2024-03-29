import { deleteCookie } from '../../utils/helpers';
import { GET_USER_FAILED, GET_USER_REQUEST, GET_USER_SUCCESS, LOGOUT_USER, TUserActions } from '../actions/User';

type TUserState = {
    data: any;
    accessToken: string | null;
    userRequest: boolean;
    userFailed: boolean;
};

export const InitialUserState: TUserState = {
    data: null,
    accessToken: null,
    userRequest: false,
    userFailed: false
};

export default function userReducer(state: TUserState = InitialUserState, action: TUserActions) {
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
