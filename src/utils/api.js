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
    return response.ok
        ? response.json()
        : response
              .json()
              .then(err => Promise.reject(err))
              .catch(() => Promise.reject({ message: 'Ошибка сервера' }));
};

function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

const saveTokens = (refreshToken, accessToken) => {
    setCookie('accessToken', accessToken);
    setCookie('refreshToken', refreshToken);
};

export const refreshTokenRequest = () => {
    return request(API_TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            token: getCookie('refreshToken')
        })
    });
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
    return request(API_ORDERS_URL, {
        method: 'POST',
        body: JSON.stringify({ ingredients: [...orderList] }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getIngredients = () => {
    return request(API_INGREDIENTS_URL);
};

export const login = (email, password) => {
    return request(API_LOGIN_URL, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        saveTokens(resp.refreshToken, resp.accessToken);
        return resp;
    });
};

export const logout = () => {
    return request(API_LOGOUT_URL, {
        method: 'POST',
        body: JSON.stringify({
            token: getCookie('refreshToken')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const userRegister = (email, password, name) => {
    return fetchWithRefresh(API_REGISTER_URL, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(resp => {
        saveTokens(resp.refreshToken, resp.accessToken);
        return resp;
    });
};

export const passwordReset = email => {
    return request(API_PASSWORD_RESET_URL, {
        method: 'POST',
        body: JSON.stringify({
            email: email
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const passwordResetConfirmation = (password, token) => {
    return request(API_PASSWORD_RESET_CONFIRMATION_URL, {
        method: 'POST',
        body: JSON.stringify({
            password: password,
            token: token
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

export const getUserApiData = () => {
    return fetchWithRefresh(API_USER_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: getCookie('accessToken')
        }
    });
};

export const setUserData = (email, password, name) => {
    return fetchWithRefresh(API_USER_URL, {
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
    });
};
