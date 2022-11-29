const BASIC_URL = 'https://norma.nomoreparties.space/api/';
export const API_INGREDIENTS_URL = BASIC_URL + 'ingredients';
export const API_ORDERS_URL = BASIC_URL + 'orders';

export const API_AUTH_URL = BASIC_URL + 'auth/';
export const API_LOGIN_URL = API_AUTH_URL + 'login';        // - эндпоинт для авторизации.
export const API_LOGOUT_URL = API_AUTH_URL + 'logout';      // - эндпоинт для выхода из системы.
export const API_REGISTER_URL = API_AUTH_URL + 'register';  // - эндпоинт для регистрации пользователя.
export const API_TOKEN_URL = API_AUTH_URL + 'token';        // - эндпоинт обновления токена.

export const API_USER_URL = API_AUTH_URL + 'user';

export const API_PASSWORD_RESET_URL = BASIC_URL + 'password-reset';
export const API_PASSWORD_RESET_CONFIRMATION_URL = API_PASSWORD_RESET_URL + '/reset';
