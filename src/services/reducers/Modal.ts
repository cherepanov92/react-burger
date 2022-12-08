import { APPEND_ERROR_MODAL_TYPE, APPEND_MODAL_TYPE, REMOVE_MODAL_TYPE, TModalActions } from '../actions/Modal';
import { EnumModalType } from '../../utils/types';

type TModalState = {
    modalType: EnumModalType | null;
    status: string | null;
    message: string | null;
};

export const InitialModalState: TModalState = {
    modalType: null,
    status: null,
    message: null
};

export default function modalReducer(state: TModalState = InitialModalState, action: TModalActions) {
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
