import { API_INGREDIENTS_URL, API_ORDERS_URL } from "./constants";

const checkResponse = (response) => {
    return response.ok ? response.json() : response.json().then((error) => Promise.reject(error));
};

export const sendOrder = (orderList) => {
    return fetch(API_ORDERS_URL, {
        method: "POST",
        body: JSON.stringify({"ingredients": [...orderList]}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(checkResponse)
}

export const getIngredients = () => {
    return fetch(API_INGREDIENTS_URL).then(checkResponse)
}