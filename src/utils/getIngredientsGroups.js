import PropTypes from "prop-types";
import {ingredientType, orderIngredientsType} from "./types";

export const getIngredientsGroups = (ingredients) => {
    return ingredients.reduce((previousValue, currentValue) => {
        return {...previousValue, [currentValue.type]: [...previousValue[currentValue.type], currentValue]}
    }, { bun: [], main: [], sauce: [] })
}

getIngredientsGroups.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export const getOrderIngredients = (orderIngredients) => {
    const { bun, main, sauce } = orderIngredients;
    const orderList = [...main, ...sauce];
    orderList.unshift(bun[0]);
    orderList.push(bun[0]);

    return orderList.map(item => item._id);
}

getOrderIngredients.propTypes = {
    ingredients: orderIngredientsType
};