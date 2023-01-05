export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_CLOSE_CONNECTION: "WS_CLOSE_CONNECTION" = "WS_CLOSE_CONNECTION";

//todo: типизировать payload когда будет понятно

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
    readonly type: typeof WS_CLOSE_CONNECTION;
    payload?: any;
}

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSGetMessage
    | IWSSendMessage
    | IWSCloseConnection;