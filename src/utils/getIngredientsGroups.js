import PropTypes from "prop-types";
import { ingredientType, orderIngredientsType } from "./types";

export const getIngredientsGroups = (ingredients) => {
    return ingredients.reduce((previousValue, currentValue) => {
        return {...previousValue, [currentValue.type]: [...previousValue[currentValue.type], currentValue]}
    }, { bun: [], main: [], sauce: [] })
}

getIngredientsGroups.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};

export const getOrderIngredients = (orderIngredients) => {
    const [bun, ingredients] = orderIngredients;
    const orderList = [...ingredients];

    if (bun) {
        orderList.unshift(bun);
        orderList.push(bun);
    }

    return orderList.map(item => item._id);
}

getOrderIngredients.propTypes = {
    orderIngredients: orderIngredientsType
};