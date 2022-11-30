import React, { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './BurgerIngredients.module.css';
import IngredientsBlock from './IngredientsBlock/IngredientsBlock';
import { IngredientsTabs } from './IngredientsTabs';
import { getIngredientsGroups } from '../../utils/getIngredientsGroups';
import { EnumIngredientType, IngredientType } from '../../utils/types';

const BurgerIngredients: FC<{ ingredients: IngredientType[] }> = ({ ingredients }) => {
    const [currentZone, setCurrentZone] = useState<EnumIngredientType>(EnumIngredientType.BUN);
    const bunRef = useRef<HTMLInputElement>(null);
    const sauceRef = useRef<HTMLInputElement>(null);
    const mainRef = useRef<HTMLInputElement>(null);

    const ingredientsByTypeList = getIngredientsGroups(ingredients);

    // @ts-ignore
    const handleScroll = e => {
        e.stopPropagation();
        const currentPosition = e.currentTarget.scrollTop + e.currentTarget.offsetTop;
        const bufZone =
            sauceRef.current && bunRef.current
                ? (sauceRef.current.offsetTop - bunRef.current.offsetTop) / 2 + bunRef.current.offsetTop
                : 0;
        const mainZone =
            mainRef.current && sauceRef.current
                ? (mainRef.current.offsetTop - sauceRef.current.offsetTop) / 2 + sauceRef.current.offsetTop
                : 0;

        if (currentPosition <= bufZone) {
            setCurrentZone(EnumIngredientType.BUN);
        } else if (currentPosition >= mainZone) {
            setCurrentZone(EnumIngredientType.MAIN);
        } else {
            setCurrentZone(EnumIngredientType.SAUCE);
        }
    };

    const changeCurrentZone = (zone: EnumIngredientType) => {
        switch (zone) {
            case EnumIngredientType.BUN:
                bunRef.current?.scrollIntoView();
                return;
            case EnumIngredientType.MAIN:
                mainRef.current?.scrollIntoView();
                return;
            case EnumIngredientType.SAUCE:
                sauceRef.current?.scrollIntoView();
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
                <>
                    <div ref={bunRef}>
                        <IngredientsBlock title={'Булки'} ingredients={ingredientsByTypeList.bun} />
                    </div>
                    <div ref={sauceRef}>
                        <IngredientsBlock title={'Соусы'} ingredients={ingredientsByTypeList.sauce} />
                    </div>
                    <div ref={mainRef}>
                        <IngredientsBlock title={'Начинки'} ingredients={ingredientsByTypeList.main} />
                    </div>
                </>
            </div>
        </div>
    );
};

const BurgerIngredientsContainer = () => {
    // @ts-ignore
    const { ingredients, ingredientsRequest } = useSelector(state => state.ingredients);

    if (ingredientsRequest && !ingredients.length) {
        return null;
    }

    return <BurgerIngredients ingredients={ingredients} />;
};

export default BurgerIngredientsContainer;
