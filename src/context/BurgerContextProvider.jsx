import React, { createContext, useState, useEffect } from 'react';
import { API_INGREDIENTS_URL } from "../utils/constants";
import { getIngredientsGroups } from "../utils/getIngredientsGroups";

export const BurgerContext = createContext({});

export const BurgerContextProvider = ({ children }) => {
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
        <BurgerContext.Provider value={{ error, fetching, ingredients }}>
            {children}
        </BurgerContext.Provider>
    );
};
