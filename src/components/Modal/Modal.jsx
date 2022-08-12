import React from 'react';
import styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal");

export function Modal({title, onClose, children}) {

    return ReactDOM.createPortal(
        <>
            <div className={styles.modalOverlay } onClick={onClose}>
                <div className={`pt-10 pl-10 pr-10 ${styles.modalBody}`}>
                    <div className={styles.header}>
                        <h3 className={`text text_type_main-large ${styles.title}`}>{title}</h3>
                        <button onClick={onClose} className={`pt-5 ${styles.button}`}>
                            <CloseIcon type='primary' />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </>,
        modalRoot
    );
}
