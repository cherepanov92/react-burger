import { APPEND_ERROR_MODAL_TYPE, APPEND_MODAL_TYPE, REMOVE_MODAL_TYPE } from '../actions/Modal';

export default function ModalReducer(state = {}, action) {
    switch (action.type) {
        case APPEND_MODAL_TYPE: {
            return {
                ...state,
                modalType: action.modalType
            };
        }
        case APPEND_ERROR_MODAL_TYPE: {
            return {
                ...state,
                modalType: 'error',
                status: action.status
            };
        }
        case REMOVE_MODAL_TYPE: {
            return {
                ...state,
                modalType: null,
                status: null
            };
        }
        default: {
            return state;
        }
    }
}
