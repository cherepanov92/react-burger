import React from 'react';
import classNames from "classnames";

import styles from './OrderDetails.module.css';
import doneIcon from './icon/done.svg';
import Modal from "../../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_MODAL_TYPE } from "../../../services/actions/Modal";

export const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderRequest, orderData } = useSelector(state => state.order);

    const closeModal = () => {
        dispatch({ type: REMOVE_MODAL_TYPE });
    }
    return (
        <Modal onClose={closeModal}>
            <div className={styles.wrapper}>
                <span className={classNames("text text_type_digits-large mt-3 mb-3", styles.orderNumber)}>
                    {!orderRequest ? orderData.number : 'Loading...'}
                </span>
                <p className={"text text_type_main-medium mb-15"}>идентификатор заказа</p>
                <img src={doneIcon} alt="Принято" />
                <p className={"text text_type_main-default pt-15 pb-2"}>Ваш заказ начали готовить</p>
                <p className={"text text_type_main-default text_color_inactive pb-30"}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </Modal>
    );
}

OrderDetails.propTypes = {};
