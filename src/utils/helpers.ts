import {IIngredientList, IngredientType, OrderedIngredient} from './types';
import { v4 as uuid } from 'uuid';

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

export const getCookie = (name: string) => {
    const matches = document.cookie.match(
        /* eslint-disable */
        new RegExp('(?:^|; )' + name.replace(/([.\\+\-*:\/?!|^${}()\[\]])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getClearAccessToken = () => {
    return getCookie('accessToken')?.split('Bearer ')[1];
};

export const deleteCookie = (name: string) => {
    setCookie(name, '', {
        'max-age': -1
    });
};

export const calculateOrderCost = (ingredients: IngredientType[]) => {
    return ingredients.reduce((sum, ingredient) => {
        return sum + ingredient.price;
    }, 0);
};

export const diffDates = (checkedData: Date) => {
    const now = new Date();
    const result = now.getTime() - checkedData.getTime();
    return  result / (1000 * 3600 * 24);
};

export const dateParse = (createdAt: string): string => {
    const createdDate = new Date(createdAt);
    const daysDiff = diffDates(createdDate);
    let dayString;

    if (daysDiff < 1) {
        dayString = `Сегодня`;
    } else if (daysDiff < 2) {
        dayString = `Вчера`;
    } else {
        dayString = `${Math.ceil(daysDiff)} дня назад`;
    }

    return `${dayString} ${createdDate.toLocaleTimeString('ru-Ru', {
        hour: 'numeric',
        minute: 'numeric'
    })}`;
};

export const getOrderIngredients = (orderIngredients: IngredientType[]): IIngredientList => {
    return orderIngredients.reduce((result, ingredientItem) => {
        return { ...result, [ingredientItem._id]: ingredientItem };
    }, {});
};

export const getIngredientWithOrderHash = (ingredient: OrderedIngredient) => ({
        ...ingredient,
        orderId: ingredient.orderId ? ingredient.orderId : uuid()
});