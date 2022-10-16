import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './BurgerIngredients.module.css';
import { IngredientsTabs } from './IngredientsTabs';
import { IngredientsBlock } from './IngredientsBlock';
import { getIngredientsData } from '../../services/actions/Ingredients';

export const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const { ingredients, ingredientsRequest } = useSelector(state => state.ingredients);
    const [currentZone, setCurrentZone] = useState('bun');

    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

    useEffect(() => {
        dispatch(getIngredientsData());
    }, [dispatch]);

    const handleScroll = e => {
        e.stopPropagation();
        const currentPosition = e.currentTarget.scrollTop + e.currentTarget.offsetTop;
        const bufZone = (sauceRef.current.offsetTop - bunRef.current.offsetTop) / 2 + bunRef.current.offsetTop;
        const mainZone = (mainRef.current.offsetTop - sauceRef.current.offsetTop) / 2 + sauceRef.current.offsetTop;

        //todo: будем в TS переписать на enum
        if (currentPosition <= bufZone) {
            setCurrentZone('bun');
        } else if (currentPosition >= mainZone) {
            setCurrentZone('main');
        } else {
            setCurrentZone('sauce');
        }
    };

    const changeCurrentZone = zone => {
        //todo: будем в TS переписать на enum
        switch (zone) {
            case 'bun':
                bunRef.current.scrollIntoView();
                return;
            case 'main':
                mainRef.current.scrollIntoView();
                return;
            case 'sauce':
                sauceRef.current.scrollIntoView();
                return;
            default:
                return;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={'pt-10 pb-5'}>
                <p className="text text_type_main-large">Соберите бургер</p>
            </div>
            <div className={'pb-10'}>
                <IngredientsTabs current={currentZone} changeCurrentZone={changeCurrentZone} />
            </div>
            <div className={styles.ingredientsBlock} onScroll={handleScroll}>
                {ingredientsRequest ? (
                    <p className="text text_type_main-large mt-5">Loading ...</p>
                ) : (
                    <>
                        <div ref={bunRef}>
                            <IngredientsBlock title={'Булки'} ingredients={ingredients.bun} />
                        </div>
                        <div ref={sauceRef}>
                            <IngredientsBlock title={'Соусы'} ingredients={ingredients.sauce} />
                        </div>
                        <div ref={mainRef}>
                            <IngredientsBlock title={'Начинки'} ingredients={ingredients.main} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

BurgerIngredients.propTypes = {};
