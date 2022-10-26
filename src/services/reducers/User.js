export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

const UserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER_REQUEST: {
            return {
                ...state,
                userRequest: true,
                userFailed: false
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                name: action.name,
                email: action.email,
                userRequest: false
            };
        }
        case GET_USER_FAILED: {
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
