import React from 'react';

import styles from './OrderDetails.module.css';
import doneIcon from './icon/done.svg';
import { ModalBody } from "../../Modal";
import classNames from "classnames";

const orderNumber = 123456

export const OrderDetails = () => {
    return (
        <ModalBody>
            <div className={styles.wrapper}>
                <span className={classNames("text text_type_digits-large mt-3 mb-3", styles.orderNumber)}>{orderNumber}</span>
                <p className={"text text_type_main-medium mb-15"}>идентификатор заказа</p>
                <img src={doneIcon} alt="Принято" />
                <p className={"text text_type_main-default pt-15 pb-2"}>Ваш заказ начали готовить</p>
                <p className={"text text_type_main-default text_color_inactive pb-30"}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </ModalBody>
    );
}
