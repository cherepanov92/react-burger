import React, { createContext, useState, useEffect, useReducer } from 'react';
import { getIngredientsGroups } from "../utils/getIngredientsGroups";
import { orderIngredientsInitState } from "../utils/mock";
import { getIngredients } from "../utils/api";

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
    const [orderData, setOrderData] = useState(null);
    const [ingredients, setIngredients] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    const [modalComponent, setModalComponent] = useState(null);
    const closeModal = () => setModalComponent(null);

    useEffect(() => {
        getIngredients()
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
        <BurgerContext.Provider value={{
            error,
            fetching,
            ingredients,
            orderIngredients,
            setOrderIngredients,
            orderData,
            setOrderData,
            modalComponent,
            setModalComponent,
            closeModal
        }}>
            {children}
        </BurgerContext.Provider>
    );
};
