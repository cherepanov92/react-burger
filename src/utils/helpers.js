import { OrderDetails } from '../components/BurgerConstructor/OrderDetails';
import { ErrorModal } from '../components/Modal/ErrorModal/ErrorModal';

export const getModal = modalType => {
    switch (modalType) {
        case 'order':
            return <OrderDetails />;
        case 'error':
            return <ErrorModal />;
        default:
            return null;
    }
};

export const setCookie = (name, value, options = {}) => {
    options = { path: '/', ...options };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
};

export function getCookie(name) {
    const matches = document.cookie.match(
        /* eslint-disable */
        new RegExp('(?:^|; )' + name.replace(/([.\\+\-*:\/?!|^${}()\[\]])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
