export const setCookie = (name: string, value: string, options: any = {}) => {
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

export function getCookie(name: string) {
    const matches = document.cookie.match(
        /* eslint-disable */
        new RegExp('(?:^|; )' + name.replace(/([.\\+\-*:\/?!|^${}()\[\]])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
    setCookie(name, '', {
        'max-age': -1
    });
}
