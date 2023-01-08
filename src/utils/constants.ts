import {getCookie} from "./helpers";

const BASIC_URL = 'norma.nomoreparties.space';

const getUrl = (type: 'HTTP' | 'WS', uri: string) => {
    switch (type) {
        case 'HTTP':
            return `https://${BASIC_URL}/api/${uri}`;
        case 'WS':
            return `wss://${BASIC_URL}/${uri}`;
    }
};

export const WSS_ALL_ORDERS_URL = getUrl('WS', 'orders/all');
export const WSS_USER_ORDERS_URL = getUrl('WS', `orders?token=${getCookie('accessToken')}`);

export const API_INGREDIENTS_URL = getUrl('HTTP', 'ingredients');
export const API_ORDERS_URL = getUrl('HTTP', 'orders');
export const API_AUTH_URL = getUrl('HTTP', 'auth');
export const API_PASSWORD_RESET_URL = getUrl('HTTP', 'password-reset');

export const API_LOGIN_URL = API_AUTH_URL + '/login';           // - эндпоинт для авторизации.
export const API_LOGOUT_URL = API_AUTH_URL + '/logout';         // - эндпоинт для выхода из системы.
export const API_REGISTER_URL = API_AUTH_URL + '/register';     // - эндпоинт для регистрации пользователя.
export const API_TOKEN_URL = API_AUTH_URL + '/token';           // - эндпоинт обновления токена.

export const API_USER_URL = API_AUTH_URL + '/user';

export const API_PASSWORD_RESET_CONFIRMATION_URL = API_PASSWORD_RESET_URL + '/reset';
