export const GET_LOGIN_REQUEST = 'GET_LOGIN_REQUEST';
export const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS';
export const GET_LOGIN_FAILED = 'GET_LOGIN_FAILED';

const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_LOGIN_REQUEST: {
            return {
                ...state,
                userRequest: true,
                userFailed: false
            };
        }
        case GET_LOGIN_SUCCESS: {
            return {
                ...state,
                name: action.name,
                email: action.email,
                userRequest: false
            };
        }
        case GET_LOGIN_FAILED: {
            return {
                ...state,
                userFailed: true,
                userRequest: false
            };
        }
        default: {
            return state;
        }
    }
};

export default UserReducer;
