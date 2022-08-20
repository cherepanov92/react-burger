import React, { useContext } from 'react';
import PropTypes from "prop-types";

import styles from './BurgerIngredients.module.css';
import { IngredientsTabs } from "./IngredientsTabs";
import { IngredientsBlock } from "./IngredientsBlock";
import { BurgerContext } from "../../context/BurgerContextProvider";

export const BurgerIngredients = ({ attachModal, onClose }) => {
    const { ingredients } = useContext(BurgerContext);

    return (
        <div className={styles.wrapper}>
            <div className={'pt-10 pb-5'}>
                <p className="text text_type_main-large">
                    Соберите бургер
                </p>
            </div>
            <div className={'pb-10'}>
                <IngredientsTabs />
            </div>
            <div className={styles.ingredientsBlock}>
                <IngredientsBlock title={'Булки'} ingredients={ingredients.bun} attachModal={attachModal} onClose={onClose}/>
                <IngredientsBlock title={'Соусы'} ingredients={ingredients.sauce} attachModal={attachModal} onClose={onClose}/>
                <IngredientsBlock title={'Начинки'} ingredients={ingredients.main} attachModal={attachModal} onClose={onClose}/>
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {
    attachModal: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};
