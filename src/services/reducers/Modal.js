import { APPEND_ERROR_MODAL_TYPE, APPEND_MODAL_TYPE, REMOVE_MODAL_TYPE } from "../actions/Modal";

const initialState = {
    modalType: null,
    errorStatus: null
}

export default function ModalReducer(state = initialState, action) {
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
                modalType: "error",
                errorStatus: action.errorStatus
            };
        }
        case REMOVE_MODAL_TYPE: {
            return {
                ...state,
                modalType: null,
                errorStatus: null
            };
        }
        default: {
            return state
        }
    }
}