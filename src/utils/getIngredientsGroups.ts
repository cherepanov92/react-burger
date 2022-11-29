import { ingredientType } from './types';

export const getIngredientsGroups = (ingredients: ingredientType[]) => {
    return ingredients.reduce(
        (previousValue, currentValue) => {
            return { ...previousValue, [currentValue.type]: [...previousValue[currentValue.type], currentValue] };
        },
        { bun: [], main: [], sauce: [] }
    );
};

export const getOrderIngredients = (orderIngredients: ingredientType[]): string[] => {
    return orderIngredients.map(item => item._id);
};
