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
    const result:string[] = [];
    orderIngredients.forEach(item => {
        if (item.type === 'bun') {
            result.push(item._id);
        }
        result.push(item._id);
    });

    return result;
};
