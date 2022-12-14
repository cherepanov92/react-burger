import React, { FC } from 'react';
import { OrderList } from '../../../components/Feed';
import styles from './Ordres.module.css';
import classNames from 'classnames';

const Orders: FC = () => {
    return (
        <section className={classNames(styles.orderList, 'mt-15')}>
            <OrderList />
        </section>
    );
};

export default Orders;
