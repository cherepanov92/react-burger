import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './OrderItem.module.css';
import classNames from 'classnames';

export const OrderItem = () => {
    return (
        <div className={classNames(styles.wrapper, 'mt-10 mb-10')}>
            <p className="text text_type_digits-default mb-10">#034533</p>
            <p className="text text_type_main-medium mb-3">testBurger</p>
            <p className="text text_type_main-default mb-15">Создан</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div className={classNames(styles.ingredients, 'pr-6 mb-10')}>
                <div className={classNames(styles.ingredient, 'mb-4')}>
                    <div className={styles.title}>
                        <div className={classNames(styles.icon, 'mr-4')}></div>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default mr-2">480</p> <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className={classNames(styles.ingredient, 'mb-4')}>
                    <div className={styles.title}>
                        <div className={classNames(styles.icon, 'mr-4')}></div>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default mr-2">2 x 480</p> <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className={classNames(styles.ingredient, 'mb-4')}>
                    <div className={styles.title}>
                        <div className={classNames(styles.icon, 'mr-4')}></div>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default mr-2">480</p> <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className={classNames(styles.ingredient, 'mb-4')}>
                    <div className={styles.title}>
                        <div className={classNames(styles.icon, 'mr-4')}></div>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default mr-2">480</p> <CurrencyIcon type="primary" />
                    </div>
                </div>
                <div className={classNames(styles.ingredient, 'mb-4')}>
                    <div className={styles.title}>
                        <div className={classNames(styles.icon, 'mr-4')}></div>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.price}>
                        <p className="text text_type_digits-default mr-2">1 x 480</p> <CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default mr-2">580</p> <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
};
