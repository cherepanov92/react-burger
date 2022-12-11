import { EnumModalType } from '../../utils/types';

export const APPEND_MODAL_TYPE: 'APPEND_MODAL_TYPE' = 'APPEND_MODAL_TYPE';
export const APPEND_ERROR_MODAL_TYPE: 'APPEND_ERROR_MODAL_TYPE' = 'APPEND_ERROR_MODAL_TYPE';
export const REMOVE_MODAL_TYPE: 'REMOVE_MODAL_TYPE' = 'REMOVE_MODAL_TYPE';

export interface IAppendModalType {
    readonly type: typeof APPEND_MODAL_TYPE;
    modalType: EnumModalType;
}

interface IAppendErrorModalType {
    readonly type: typeof APPEND_ERROR_MODAL_TYPE;
    status?: string | null;
    message: string | null;
}

interface IRemoveModalTypeE {
    readonly type: typeof REMOVE_MODAL_TYPE;
}

export type TModalActions = IAppendModalType | IRemoveModalTypeE | IAppendErrorModalType;