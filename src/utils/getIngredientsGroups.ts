import { IngredientType } from './types';

export const getIngredientsGroups = (ingredients: IngredientType[]) => {
    return ingredients.reduce(
        (previousValue, currentValue) => {
            return { ...previousValue, [currentValue.type]: [...previousValue[currentValue.type], currentValue] };
        },
        { bun: [], main: [], sauce: [] }
    );
};

export const getOrderIngredients = (orderIngredients: IngredientType[]): string[] => {
    return orderIngredients.map(item => item._id);
};
