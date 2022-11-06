import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './IngredientDetails.module.css';
import Modal from '../Modal/Modal';
import { REMOVE_MODAL_TYPE } from '../../services/actions/Modal';

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

export const IngredientDetails = ({ useModal }) => {
    const { ingredientId } = useParams();
    const dispatch = useDispatch();
    const { ingredients } = useSelector(state => state.ingredients);

    const closeIngredientModal = () => {
        dispatch({ type: REMOVE_MODAL_TYPE });

    };

    const currentIngredient = ingredients.filter(ingredient => ingredient._id === ingredientId)[0];

    return useModal ? (
        <Modal title={'Детали ингредиента'} onClose={closeIngredientModal}>
            <IngredientDetailsContent ingredient={currentIngredient} />
        </Modal>
    ) : (
        <IngredientDetailsContent ingredient={currentIngredient} />
    );
};

IngredientDetails.propTypes = {};
