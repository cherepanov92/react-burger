export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_CONNECTION_CLOSED: 'WS_CLOSE_CONNECTION' = 'WS_CLOSE_CONNECTION';

interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    payload?: any;
}

interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    payload?: any;
}

interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload?: any;
}

interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload?: any;
}

interface IWSSendMessage {
    readonly type: typeof WS_SEND_MESSAGE;
    payload?: any;
}

interface IWSCloseConnection {
    readonly type: typeof WS_CONNECTION_CLOSED;
    payload?: any;
}

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSGetMessage
    | IWSSendMessage
    | IWSCloseConnection;