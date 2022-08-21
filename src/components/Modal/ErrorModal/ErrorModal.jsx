import React, { useContext } from "react";
import { BurgerContext } from "../../../context/BurgerContextProvider";
import Modal from "../Modal";
import classNames from "classnames";

import styles from "./ErrorModal.module.css";
import PropTypes from "prop-types";


export const ErrorModal = ({ errorStatus }) => {
    const { closeModal } = useContext(BurgerContext);

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

ErrorModal.propTypes = {
    errorStatus: PropTypes.string.isRequired
};