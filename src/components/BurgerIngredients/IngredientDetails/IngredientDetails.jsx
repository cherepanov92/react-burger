import React, { useContext } from 'react';
import classNames from "classnames";

import styles from './IngredientDetails.module.css';
import Modal from "../../Modal/Modal";
import { ingredientType } from "../../../utils/types";
import { BurgerContext } from "../../../context/BurgerContextProvider";

export const IngredientDetails = ({ingredient}) => {
    const { closeModal } = useContext(BurgerContext);

    return (
        <Modal title={'Детали ингредиента'} onClose={closeModal} >
            <div className={styles.wrapper}>
                <img src={ingredient.image_large} alt={ingredient.name} />
                <p className={"text text_type_main-medium pt-3 pb-3"}>{ingredient.name}</p>
                <div className={classNames("pt-5 pb-15", styles.propertyList)}>
                    <div className={styles.propertyItem}>
                        <p className={"text text_type_main-default text_color_inactive mb-2"}>Калории,ккал</p>
                        <p className={"text text_type_digits-default text_color_inactive"}>{ingredient.calories}</p>
                    </div>
                    <div className={styles.propertyItem}>
                        <p className={"text text_type_main-default text_color_inactive mb-2"}>Белки, г</p>
                        <p className={"text text_type_digits-default text_color_inactive"}>{ingredient.proteins}</p>
                    </div>
                    <div className={styles.propertyItem}>
                        <p className={"text text_type_main-default text_color_inactive mb-2"}>Жиры, г</p>
                        <p className={"text text_type_digits-default text_color_inactive"}>{ingredient.fat}</p>
                    </div>
                    <div className={styles.propertyItem}>
                        <p className={"text text_type_main-default text_color_inactive mb-2"}>Углеводы, г</p>
                        <p className={"text text_type_digits-default text_color_inactive"}>{ingredient.carbohydrates}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired
};