import {
    API_INGREDIENTS_URL,
    API_LOGIN_URL,
    API_LOGOUT_URL,
    API_ORDERS_URL,
    API_PASSWORD_RESET_CONFIRMATION_URL,
    API_PASSWORD_RESET_URL,
    API_REGISTER_URL,
    API_TOKEN_URL,
    API_USER_URL
} from './constants';
import { getCookie, setCookie } from './helpers';

const checkResponse = response => {
    return response.ok ? response.json() : response.json().then(err => Promise.reject(err));
};

const saveTokens = (refreshToken, accessToken) => {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
};

export const refreshTokenRequest = () => {
    return fetch(API_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === 'jwt expired') {
            const { refreshToken, accessToken } = await refreshTokenRequest();
            saveTokens(refreshToken, accessToken);
            options.headers.authorization = accessToken;

            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
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
    .then(resp => {
        saveTokens(resp.refreshToken, resp.accessToken)
        return resp;
    });
};

export const logout = () => {
    return fetch(API_LOGOUT_URL, {
        method: 'POST',
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(checkResponse);
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
        .then(fetchWithRefresh);
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

export const getUserApiData = () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('accessToken')
        }
    };
    return fetchWithRefresh(API_USER_URL, options);
};

export const setUserData = (email, password, name) => {
    const options = {
        method: 'PATCH',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('accessToken')
        }
    };

    return fetchWithRefresh(API_USER_URL, options);
};
