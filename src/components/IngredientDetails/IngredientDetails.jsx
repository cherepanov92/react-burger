import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getIngredientsData } from '../../services/actions/Ingredients';

import styles from './IngredientDetails.module.css';

const IngredientDetailsContent = ({ ingredient, isLoading }) => {
    const getProperty = propertyName => {
        return isLoading ? '...' : ingredient[propertyName];
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

const IngredientDetails = ({ ingredient }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => setIsLoading(ingredient === null), [ingredient]);

    return <IngredientDetailsContent ingredient={ingredient} isLoading={isLoading} />;
};

const IngredientDetailsContainer = ({ useModal }) => {
    const dispatch = useDispatch();
    const { ingredientId } = useParams();
    const { ingredientDetails, ingredientList } = useSelector(state => ({
        ingredientDetails: state.ingredientDetails,
        ingredientList: state.ingredients
    }));

    useEffect(() => {
        if (!useModal) {
            dispatch(getIngredientsData());
        }
    }, [dispatch, useModal]);

    const getIngredient = () => {
        if (ingredientDetails) {
            return ingredientDetails;
        } else if (!!ingredientList.ingredients.length) {
            return ingredientList.ingredients.filter(item => item._id === ingredientId)[0];
        }

        return null;
    };

    return <IngredientDetails ingredient={getIngredient()} />;
};

IngredientDetails.propTypes = {};

export default IngredientDetailsContainer;
