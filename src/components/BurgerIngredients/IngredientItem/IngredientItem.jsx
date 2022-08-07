import React from 'react';
import styles from './IngredientItem.module.css';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { dataTypes } from "../../../utils/data";
import classNames from "classnames";

export function IngredientItem({data}) {
    return (
        <div className={classNames(styles.wrapper, 'mb-4')}>
            <Counter count={1} size="default" />
            <img className={"ml-4 mr-4 mb-1"} src={data.image} alt={`Компонент: ${data.name}`}/>
            <div className={styles.priceBlock + " pt-1 pb-1"}>
                <span className="text text_type_digits-default mr-2">{data.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <span className="text text_type_main-default pt-1">{data.name}</span>
        </div>
    );
}

IngredientItem.propTypes = {
    data: PropTypes.arrayOf(dataTypes.isRequired)
};