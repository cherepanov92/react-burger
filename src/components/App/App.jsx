import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import styles from './App.module.css';
import { AppHeader } from '../AppHeader';
import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { REMOVE_INGREDIENT_DETAILS } from "../../services/actions/IngredientDetails";
import {IngredientDetails} from "../BurgerIngredients/IngredientDetails";

function App() {
    const dispatch = useDispatch();
    const ingredientDetails = useSelector(state => state.ingredientDetails);

    const closeIngredientModal = () => {
        dispatch({ type: REMOVE_INGREDIENT_DETAILS, ingredient: ingredientDetails })
    }


    return (
        <div className="App">
            <AppHeader />
            <main className={styles.content}>
                    <>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </>
            </main>
            {/*todo: реализовать подобное для ошибок*/}
            {ingredientDetails && <IngredientDetails onClose={closeIngredientModal} ingredient={ingredientDetails} />}
        </div>
    );
}

export default App;
