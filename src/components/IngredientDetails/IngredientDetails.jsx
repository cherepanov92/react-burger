import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './IngredientDetails.module.css';
import { getIngredientsData } from '../../services/actions/Ingredients';

const IngredientDetailsContent = ({ ingredient }) => {
    return (
        <div className={styles.wrapper}>
            <img src={ingredient.image_large} alt={ingredient.name} />
            <p className={'text text_type_main-medium pt-3 pb-3'}>{ingredient.name}</p>
            <div className={classNames('pt-5 pb-15', styles.propertyList)}>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Калории,ккал</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.calories}</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Белки, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.proteins}</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Жиры, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.fat}</p>
                </div>
                <div className={styles.propertyItem}>
                    <p className={'text text_type_main-default text_color_inactive mb-2'}>Углеводы, г</p>
                    <p className={'text text_type_digits-default text_color_inactive'}>{ingredient.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

const IngredientDetails = ({ ingredient }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => setIsLoading(ingredient === null), [ingredient]);

    if (isLoading) {
        return <p>Loading</p>;
    }

    return <IngredientDetailsContent ingredient={ingredient} />;
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
