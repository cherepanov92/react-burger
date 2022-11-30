import React, { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './IngredientDetails.module.css';
import { IngredientType } from '../../utils/types';

type IngredientDetailsProps = {
    ingredient: IngredientType;
};

const IngredientDetailsContent: FC<IngredientDetailsProps & { isLoading: boolean }> = ({ ingredient, isLoading }) => {
    const getProperty = (propertyName: string) => {
        return isLoading ? '...' : ingredient[propertyName as keyof IngredientType];
    };

    return (
        <div className={styles.wrapper}>
            {isLoading ? (
                <div className={styles.loaderContainer}>
                    <span className={styles.loader}></span>
                </div>
            ) : (
                <img src={ingredient.image_large} alt={ingredient.name} />
            )}
            <p className={'text text_type_main-medium pt-3 pb-3'}>{!isLoading && ingredient.name}</p>
            <div className={classNames('pt-5 pb-15', styles.propertyList)}>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Калории,ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{getProperty('calories')}</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{getProperty('proteins')}</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{getProperty('fat')}</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>
                        {getProperty('carbohydrates')}
                    </p>
                </div>
            </div>
        </div>
    );
};

const IngredientDetails: FC<IngredientDetailsProps> = ({ ingredient }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => setIsLoading(ingredient === null), [ingredient]);

    return <IngredientDetailsContent ingredient={ingredient} isLoading={isLoading} />;
};

const IngredientDetailsContainer = () => {
    const { ingredientId }: { ingredientId: string } = useParams();
    const { ingredientDetails, ingredientList } = useSelector(state => ({
        // @ts-ignore
        ingredientDetails: state.ingredientDetails,
        // @ts-ignore
        ingredientList: state.ingredients
    }));

    const getIngredient = () => {
        if (ingredientDetails) {
            return ingredientDetails;
        }

        return ingredientList.ingredients.filter((item: IngredientType) => item._id === ingredientId)[0];
    };

    return <IngredientDetails ingredient={getIngredient()} />;
};

export default IngredientDetailsContainer;
