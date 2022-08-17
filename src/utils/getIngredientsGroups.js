import PropTypes from "prop-types";
import {ingredientType} from "./types";

export const getIngredientsGroups = (ingredients) => {
    return ingredients.reduce((previousValue, currentValue) => {
        return {...previousValue, [currentValue.type]: [...previousValue[currentValue.type], currentValue]}
    }, { bun: [], main: [], sauce: [] })
}

getIngredientsGroups.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired
};