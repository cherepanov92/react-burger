import React, { FC } from 'react';
import { OrderList } from '../../../components/Feed';
import styles from './Ordres.module.css';
import classNames from 'classnames';
import {useAppSelector} from "../../../services/reducers/Root";

const Orders: FC = () => {
    const { orderData, ingredients } = useAppSelector(state => ({
        orderData: state.orderList.data,
        ingredients: state.ingredients.ingredients
    }));

    return (
        <section className={classNames(styles.orderList, 'mt-15')}>
            <OrderList orderData={orderData} ingredients={ingredients} />
        </section>
    );
};

export default Orders;
