import React, { FC } from 'react';
import '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Feed.module.css';
import classNames from "classnames";
import OrderListItem from "../OrderListItem/OrderListItem";

const OrderTable: FC = () => {
    return (
        <>
            <div className={styles.numbers}>
                <div className={styles.numbers_block}>
                    <p className="text text_type_main-medium mb-6">Готовы</p>
                    <div className={styles.numbers_blue}>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                    </div>
                </div>
                <div className={styles.numbers_block}>
                    <p className="text text_type_main-medium mb-6">В работе</p>
                    <div>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                        <p className="text text_type_digits-default mb-2">1234567890</p>
                    </div>
                </div>
            </div>
            <div className={'mt-15'}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={styles.result_text + ' text text_type_digits-large'}>28 555</p>
            </div>
            <div className={'mt-15'}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={styles.result_text + ' text text_type_digits-large'}>138</p>
            </div>
        </>
    )
}

const Feed: FC = () => {
    return (
        <div className={classNames(styles.container, "pl-4 pr-4 mt-10")}>
            <p className="text text_type_main-large mt-10 mb-5">Лента заказов</p>
            <div className={styles.wrapper}>
                <div className={styles.orders + ' pr-2'}>
                    <OrderListItem />
                    <OrderListItem />
                    <OrderListItem />
                    <OrderListItem />
                    <OrderListItem />
                    <OrderListItem />
                    <OrderListItem />
                    <OrderListItem />
                </div>
                <div className={styles.orderTable}>
                    <OrderTable />
                </div>
            </div>
        </div>
    );
};

const FeedContainer:FC = () => {
    return <Feed />;
};

export default FeedContainer;