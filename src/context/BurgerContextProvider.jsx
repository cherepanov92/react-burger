import React, { createContext, useState, useEffect, useReducer } from 'react';
import { API_INGREDIENTS_URL } from "../utils/constants";
import { getIngredientsGroups } from "../utils/getIngredientsGroups";
import { orderIngredientsInitState } from "../utils/mock";

export const BurgerContext = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case "append":
            if (action.ingredient.type === 'bun') {
                let newTotalPrice = state.totalPrice;
                if (state.bun[0]) {
                    newTotalPrice = newTotalPrice - (state.bun[0].price * 2);
                }
                return {...state, bun:[action.ingredient], totalPrice: newTotalPrice + (action.ingredient.price * 2)
                }
            }
            return {...state, [action.ingredient.type]:[...state[action.ingredient.type], action.ingredient], totalPrice: state.totalPrice + action.ingredient.price};
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}

export const BurgerContextProvider = ({ children }) => {
    const [orderIngredients, setOrderIngredients] = useReducer(reducer, orderIngredientsInitState, undefined);
    const [ingredients, setIngredients] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(API_INGREDIENTS_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(`Статус ${response.status}`);
            })
            .then(responseData => responseData.data)
            .then(data => {
                setIngredients(getIngredientsGroups(data))
                setFetching(false);
            })
            .catch((err) => {
                setError(err)
            });
    }, [])

    return (
        <BurgerContext.Provider value={{ error, fetching, ingredients, orderIngredients, setOrderIngredients }}>
            {children}
        </BurgerContext.Provider>
    );
};
