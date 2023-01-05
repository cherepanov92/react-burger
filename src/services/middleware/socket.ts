import type { Middleware, MiddlewareAPI } from 'redux';
import {
    TWSActions, WS_CLOSE_CONNECTION,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../actions/WebSocket';
import { AppDispatch, RootState } from '../reducers/Root';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TWSActions) => {
            const { dispatch } = store;
            const { type, payload } = action;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(wsUrl);
            }

            if (type === WS_CLOSE_CONNECTION) {
                socket?.close();
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const dataObject = JSON.parse(data);
                    dispatch({ type: WS_GET_MESSAGE, payload: dataObject?.orders });
                };

                socket.onclose = event => {
                    console.log('WS closed');
                };

                if (type === WS_SEND_MESSAGE) {
                    socket.send(JSON.stringify(payload));
                }
            }

            next(action);
        };
    }) as Middleware;
};