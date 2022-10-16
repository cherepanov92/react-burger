import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import Modal from "../Modal";
import styles from "./ErrorModal.module.css";
import { REMOVE_MODAL_TYPE } from "../../../services/actions/Modal";


export const ErrorModal = () => {
    const dispatch = useDispatch();
    const { errorStatus } = useSelector(state => state.modal);

    const closeModal = () => {
        dispatch({ type: REMOVE_MODAL_TYPE });
    }

    return (
        <Modal onClose={closeModal} title={"Ошибка"}>
            <div className={styles.wrapper}>
                <span className={classNames("text text_type_main-medium mt-3 mb-3 pb-10")}>
                    Статус:{ errorStatus }
                </span>
            </div>
        </Modal>
    );
}

ErrorModal.propTypes = {};