import React from 'react';
import PropTypes from "prop-types";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ModalBody.module.css';

export function ModalBody({title, onClose, children}) {
    return (
        <div className={`pt-10 pl-10 pr-10 ${styles.modalBody}`}>
            <div className={styles.header}>
                <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>
                <button onClick={onClose} className={`pt-5 ${styles.button}`}>
                    <CloseIcon type='primary' />
                </button>
            </div>
            {children}
        </div>
    );
}

ModalBody.propTypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
};
