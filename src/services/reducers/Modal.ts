import { APPEND_ERROR_MODAL_TYPE, APPEND_MODAL_TYPE, REMOVE_MODAL_TYPE } from '../actions/Modal';
import { EnumModalType } from '../../utils/types';

type modalState = {
    modalType?: EnumModalType;
    status?: string;
    message?: string;
};

export default function modalReducer(state: modalState = {}, action: any) {
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
                modalType: EnumModalType.ERROR,
                status: action.status,
                message: action.message
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
