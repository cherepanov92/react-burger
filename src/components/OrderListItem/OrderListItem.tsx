import React, { FC } from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderListItem.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderListItem: FC = () => {
    return (
        <div className={styles.item + ' pt-6 pr-6 pb-6 pl-6 mb-4'}>
            <div className={styles.top + ' mb-6'}>
                <p className="text text_type_digits-default">#034535</p>
                <p className="text text_type_main-default text_color_inactive">Сегодня, 14:20 i-GMT+3</p>
            </div>
            <p className="text text_type_main-medium mb-2">Super бургер</p>
            <p className="text text_type_main-default mb-6">Создан</p>
            <div className={styles.bottom}>
                <div className={styles.params}>
                    <div className={styles.param + ' text text_type_main-default text_color_inactive'}>+3</div>
                    <div className={styles.param}></div>
                    <div className={styles.param}></div>
                    <div className={styles.param}></div>
                    <div className={styles.param}></div>
                    <div className={styles.param}></div>
                </div>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">480</p> <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};

const OrderListItemContainer: FC = () => {
    return <OrderListItem />;
};

export default OrderListItemContainer;