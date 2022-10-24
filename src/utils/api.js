import {
    API_INGREDIENTS_URL,
    API_LOGIN_URL,
    API_ORDERS_URL,
    API_PASSWORD_RESET_CONFIRMATION_URL,
    API_PASSWORD_RESET_URL,
    API_REGISTER_URL, API_TOKEN_URL
} from './constants';
import {getCookie, setCookie} from './helpers';

const checkResponse = response => {
    return response.ok ? response.json() : Promise.reject(response);
};

const completeAccessToken = response => {
    let authToken;
    let refreshToken;

    const accessToken = response?.accessToken;

    if (response?.accessToken.indexOf('Bearer') === 0) {
        authToken = accessToken.split('Bearer ')[1];
    }

    if (response?.refreshToken) {
        refreshToken = response.refreshToken;
    }

    authToken && setCookie('accessToken', authToken);
    refreshToken && setCookie('refreshToken', refreshToken);

    return response;
};

export const sendOrder = orderList => {
    return fetch(API_ORDERS_URL, {
        method: 'POST',
        body: JSON.stringify({ ingredients: [...orderList] }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(checkResponse);
};

export const getIngredients = () => {
    return fetch(API_INGREDIENTS_URL).then(checkResponse);
};

export const login = (email, password) => {
    return fetch(API_LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then(completeAccessToken);
};

export const userRegister = (email, password, name) => {
    return fetch(API_REGISTER_URL, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then(completeAccessToken);
};

export const refreshToken = () => {
    return fetch(API_TOKEN_URL, {
        method: 'POST',
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(checkResponse)
        .then(completeAccessToken);
};

export const passwordReset = email => {
    return fetch(API_PASSWORD_RESET_URL, {
        method: 'POST',
        body: JSON.stringify({
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(checkResponse);
};

export const passwordResetConfirmation = (password, token) => {
    return fetch(API_PASSWORD_RESET_CONFIRMATION_URL, {
        method: 'POST',
        body: JSON.stringify({
            password: password,
            token: token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(checkResponse);
};
