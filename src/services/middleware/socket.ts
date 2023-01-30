import type { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../reducers/Root';

export const socketMiddleware = (wsActions: { [key: string]: any }): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
            const user = getState().user;

            if (type === wsInit && user) {
                socket = new WebSocket(payload.url);
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const dataObject = JSON.parse(data);
                    dispatch({ type: onMessage, payload: dataObject?.orders });
                };

                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = { ...payload, token: user.accessToken };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
};